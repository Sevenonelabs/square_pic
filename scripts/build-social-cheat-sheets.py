"""Build SquarePic's branded A4 PDFs from the web reference data.

Requires reportlab and pypdf. Embeds Segoe UI when installed, with a Helvetica
fallback. Original public download URLs remain compatible copies.
"""
from datetime import date
from html import escape
from pathlib import Path
import json
import os
import shutil

from pypdf import PdfReader
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas
from reportlab.platypus import Paragraph

ROOT = Path(__file__).resolve().parents[1]
DATA = json.loads((ROOT / "src/data/social-image-reference.json").read_text(encoding="utf-8"))
OUTPUT = ROOT / "output/pdf"
PUBLIC = ROOT / "public/downloads"
SITE = "https://www.squarepic.io"
UPDATED = date.fromisoformat(DATA["updated"])
UPDATE_LABEL = f"{UPDATED.strftime('%B')} {UPDATED.day}, {UPDATED.year}"
W, H = A4
M = 40
CW = W - 2 * M
INK = colors.HexColor("#0b111b")
MUTED = colors.HexColor("#526071")
LINE = colors.HexColor("#dbe1e7")
PAPER = colors.HexColor("#fafbf8")
LIME = colors.HexColor("#aaec05")
GREEN = colors.HexColor("#375a05")
PALE = colors.HexColor("#f0f6df")
AMBER = colors.HexColor("#815414")
FONT, BOLD = "Helvetica", "Helvetica-Bold"
FONT_DIR = Path(os.environ.get("SystemRoot", "C:/Windows")) / "Fonts"
if all((FONT_DIR / name).exists() for name in ["segoeui.ttf", "segoeuib.ttf"]):
    pdfmetrics.registerFont(TTFont("SquarePicSans", str(FONT_DIR / "segoeui.ttf")))
    pdfmetrics.registerFont(TTFont("SquarePicSansBold", str(FONT_DIR / "segoeuib.ttf")))
    FONT, BOLD = "SquarePicSans", "SquarePicSansBold"
    pdfmetrics.registerFontFamily(FONT, normal=FONT, bold=BOLD)

PLATFORMS = {item["id"]: item for item in DATA["platforms"]}
NUMBER = {item["id"]: i + 1 for i, item in enumerate(DATA["platforms"])}
GROUPS = [
    ["instagram", "facebook", "twitter"],
    ["linkedin", "tiktok", "youtube"],
    ["pinterest", "snapchat", "whatsapp", "twitch"],
    ["reddit", "telegram", "discord"],
]
QUICK_NOTES = {
    "instagram": "Working canvases. Preview carousel and profile-grid crops.",
    "facebook": "Working exports. Check cover crops on desktop and mobile.",
    "twitter": "Keep the header subject clear of the profile-photo overlap.",
    "linkedin": "Company Page covers and personal covers use different sizes.",
    "youtube": "Banner safe area at the minimum upload: 1235 x 338 pixels.",
    "tiktok": "Ad specifications apply to Standard Carousel ads only.",
    "pinterest": "Standard image canvas. Taller Pins can be cropped in feeds.",
    "snapchat": "The ad specification applies to Single Image or Video Ads.",
    "whatsapp": "500 x 500 is a working export, separate from the minimum.",
    "twitch": "Panel height varies. 320 x 160 is a working canvas.",
    "reddit": "Desktop and mobile have separate minimum banner widths.",
    "telegram": "API-generated photo sizes are not upload requirements.",
    "discord": "Server banner: Level 2. Invite background: Level 1.",
}


def paragraph(c, text, x, top, width, size=9.5, leading=13, color=INK, bold=False, markup=False):
    """Draw a measured paragraph using coordinates from the top of the page."""
    style = ParagraphStyle("text", fontName=BOLD if bold else FONT,
                           fontSize=size, leading=leading, textColor=color,
                           splitLongWords=True, spaceAfter=0)
    block = Paragraph(text if markup else escape(text), style)
    _, height = block.wrap(width, H)
    assert top + height < H - 43, f"Text overruns the page: {text[:70]}"
    block.drawOn(c, x, H - top - height)
    return height


def label(c, text, x, top, size=8, color=MUTED):
    c.setFillColor(color)
    c.setFont(BOLD, size)
    c.drawString(x, H - top - size, text)


def rule(c, top, x=M, width=CW, color=LINE, weight=.6):
    c.setStrokeColor(color)
    c.setLineWidth(weight)
    c.line(x, H - top, x + width, H - top)


def branding(c, dark=False):
    c.drawImage(str(ROOT / "public/images/logo-256.png"), M, H - 59,
                width=30, height=30, mask="auto")
    c.linkURL(SITE, (M, H - 59, M + 135, H - 27), relative=0)
    paragraph(c, "SquarePic", M + 40, 29, 150, 20, 24,
              colors.white if dark else INK, bold=True)
    c.setFont(BOLD, 11)
    c.setFillColor(LIME if dark else GREEN)
    c.drawRightString(W - M, H - 45, "squarepic.io")
    c.linkURL(SITE, (W - M - 85, H - 49, W - M, H - 30), relative=0)


def footer(c, year, page):
    url = f"{SITE}/guides/social-media-image-sizes-{year}"
    rule(c, H - 62)
    label(c, "SQUAREPIC  /  SOCIAL IMAGE REFERENCE", M, H - 52, 7.2)
    c.setFont(FONT, 7.2)
    c.setFillColor(MUTED)
    c.drawRightString(W - M, 44, f"{page:02d} / 06")
    c.setFont(FONT, 7.5)
    c.drawString(M, 28, url)
    c.linkURL(url, (M, 24, W - M, 38), relative=0)


def start_page(c, year, page, title=None, subtitle=None):
    c.setFillColor(PAPER)
    c.rect(0, 0, W, H, fill=1, stroke=0)
    if page == 1:
        c.setFillColor(INK)
        c.rect(0, H - 215, W, 215, fill=1, stroke=0)
        branding(c, dark=True)
        rule(c, 75, color=colors.HexColor("#2c3744"))
        label(c, "PRINTABLE CHEAT SHEET  /  13 PLATFORMS", M, 88, 8, LIME)
        paragraph(c, "Social media<br/>image sizes", M, 108, 340,
                  30, 33, colors.white, bold=True, markup=True)
        c.setFillColor(LIME)
        c.setFont(BOLD, 44)
        c.drawRightString(W - M, H - 150, str(year))
        c.setFont(FONT, 8.5)
        c.setFillColor(colors.HexColor("#c1cbd7"))
        c.drawRightString(W - M, H - 167,
                          "Planning edition" if year == 2027 else "Reference edition")
        label(c, f"UPDATED {UPDATE_LABEL.upper()}", M, 184, 8.2, colors.HexColor("#c1cbd7"))
        c.setFillColor(LIME)
        c.rect(0, H - 215, W, 3, fill=1, stroke=0)
    else:
        branding(c)
        rule(c, 75)
        label(c, f"{year} EDITION  /  UPDATED {UPDATE_LABEL.upper()}", M, 92, 8, GREEN)
        paragraph(c, title, M, 111, CW, 25, 29, bold=True)
        paragraph(c, subtitle, M, 149, CW, 9.5, 13, MUTED)
    footer(c, year, page)


def platform_block(c, platform_id, top):
    item = PLATFORMS[platform_id]
    number = NUMBER[platform_id]
    source_page = 5 if number <= 6 else 6
    label(c, f"{number:02d}", M, top + 3, 9.5, GREEN)
    paragraph(c, item["name"], M + 26, top, 340, 14, 18, bold=True)
    c.setFont(FONT, 8)
    c.setFillColor(MUTED)
    c.drawRightString(W - M, H - top - 13, f"Notes / sources p. {source_page}")
    top += 24
    columns = [0, 170, 308, 368]
    widths = [160, 128, 50, CW - 378]
    headers = ["PLACEMENT", "PIXELS / W x H", "RATIO", "BASIS"]
    c.setFillColor(colors.HexColor("#edf0eb"))
    c.rect(M, H - top - 19, CW, 19, fill=1, stroke=0)
    for x, text in zip(columns, headers):
        label(c, text, M + x + 5, top + 5, 7)
    top += 19
    for row in item["rows"]:
        cells = [row["placement"], row["size"], row["ratio"], row["basis"]]
        measured = []
        for i, value in enumerate(cells):
            style = ParagraphStyle("measure", fontName=BOLD if i == 1 else FONT,
                                   fontSize=10.5 if i == 1 else 9,
                                   leading=12 if i == 1 else 11)
            measured.append(Paragraph(escape(value), style).wrap(widths[i], H)[1])
        row_height = max(25, max(measured) + 10)
        for i, value in enumerate(cells):
            color = MUTED if i in [2, 3] else INK
            if i == 3:
                color = GREEN if value == "Recommendation" else AMBER if value in ["Minimum", "Requirement", "Suggested minimum"] else MUTED
            paragraph(c, value, M + columns[i] + 5, top + 5, widths[i],
                      10.5 if i == 1 else 9, 12 if i == 1 else 11, color, bold=i == 1)
        top += row_height
        rule(c, top)
    top += 5
    top += paragraph(c, QUICK_NOTES[platform_id], M + 5, top, CW - 10, 8.3, 11, MUTED)
    return top + 16


def callout(c, top, heading, text):
    style = ParagraphStyle("measure", fontName=FONT, fontSize=9, leading=12)
    _, text_height = Paragraph(escape(text), style).wrap(CW - 30, H)
    height = 40 + text_height
    assert top + height < H - 76, f"Callout overlaps footer at {top}"
    c.setFillColor(PALE)
    c.rect(M, H - top - height, CW, height, fill=1, stroke=0)
    c.setFillColor(LIME)
    c.rect(M, H - top - height, 3, height, fill=1, stroke=0)
    label(c, heading, M + 15, top + 11, 8.5, GREEN)
    paragraph(c, text, M + 15, top + 28, CW - 30, 9, 12, INK)


def ratios(c, top):
    rule(c, top)
    label(c, "COMMON CANVASES", M, top + 12, 8, GREEN)
    items = [("1:1", "Square", 27, 27), ("4:5", "Portrait", 23, 29),
             ("2:3", "Pin", 20, 30), ("9:16", "Vertical", 17, 30),
             ("16:9", "Landscape", 39, 22)]
    for i, (ratio, text, width, height) in enumerate(items):
        x = M + i * (CW / 5)
        c.setStrokeColor(GREEN)
        c.setLineWidth(1)
        c.setFillColor(PALE)
        c.rect(x, H - top - 66, width, height, fill=1, stroke=1)
        label(c, ratio, x + 45, top + 38, 10, INK)
        paragraph(c, text, x + 45, top + 53, CW / 5 - 47, 7.5, 10, MUTED)


def banner_safe_area(c, top):
    rule(c, top)
    label(c, "YOUTUBE BANNER / TEXT AND LOGO SAFE AREA", M, top + 5, 8, GREEN)
    width, height = 94, 94 * 1152 / 2048
    x, y = M, H - top - 22 - height
    c.setFillColor(colors.HexColor("#e8ede4"))
    c.setStrokeColor(GREEN)
    c.rect(x, y, width, height, fill=1, stroke=1)
    safe_w, safe_h = width * 1235 / 2048, height * 338 / 1152
    c.setFillColor(LIME)
    c.rect(x + (width - safe_w) / 2, y + (height - safe_h) / 2,
           safe_w, safe_h, fill=1, stroke=0)
    paragraph(c, "1235 x 338", M + 111, top + 26, 150, 13, 17, bold=True)
    paragraph(c, "Safe area at the minimum 2048 x 1152 upload. Keep text and logos inside the highlighted center; check YouTube's upload preview.",
              M + 111, top + 48, CW - 111, 8.5, 11, MUTED)


def source_block(c, item, top):
    label(c, f"{NUMBER[item['id']]:02d}", M, top + 3, 9.5, GREEN)
    paragraph(c, item["name"], M + 26, top, CW - 26, 13, 17, bold=True)
    top += 18
    top += paragraph(c, item["note"], M + 26, top, CW - 26, 9, 11.5, MUTED)
    top += 4
    for source in item["sources"]:
        status = source["status"]
        top += paragraph(c, f"{source['label']}  /  {status}", M + 26, top, CW - 26,
                         8.3, 10.5, GREEN if status == "Checked" else AMBER, bold=True)
        url = escape(source["url"], quote=True)
        top += paragraph(c, f'<link href="{url}" color="#375a05">{url}</link>',
                         M + 26, top + 2, CW - 26, 8, 10.5, GREEN, markup=True) + 5
    rule(c, top + 3)
    return top + 8


def build(year):
    filename = f"squarepic-social-media-image-sizes-{year}-cheat-sheet.pdf"
    path = OUTPUT / filename
    guide_url = f"{SITE}/guides/social-media-image-sizes-{year}"
    c = canvas.Canvas(str(path), pagesize=A4, pageCompression=1)
    c.setTitle(f"SquarePic | Social media image sizes {year} | Cheat sheet")
    c.setAuthor("SquarePic / SevenOneLabs")
    c.setSubject(f"{year} image dimensions for 13 platforms. Updated {UPDATE_LABEL}. {SITE}")
    c.setCreator("SquarePic - squarepic.io")
    for page, group in enumerate(GROUPS, start=1):
        titles = {2: "Professional posts and video", 3: "Pins, ads and channel artwork", 4: "Community profiles and banners"}
        start_page(c, year, page,
                   titles.get(page),
                   "All dimensions are pixels, width first. Ad specifications apply to the named placement."
                   if page == 2 else "Use separate exports for desktop and mobile. Preview every crop before publishing.")
        top = 232 if page == 1 else 183
        if page == 1:
            top += paragraph(c, "Dimensions in pixels, width first. Recommendations and requirements are labeled; working canvases are SquarePic export sizes. Full sources are on pages 5 and 6.",
                             M, top, CW, 9, 12, MUTED) + 15
        for platform_id in group:
            top = platform_block(c, platform_id, top)
        assert top < H - 77, f"Platform table overflows page {page}: {top}"
        if page == 1:
            callout(c, top + 1, "2027 PLANNING EDITION" if year == 2027 else "2026 REFERENCE EDITION",
                    f"Based on documentation available {UPDATE_LABEL}. Recheck sources before publishing in 2027; future changes are not confirmed."
                    if year == 2027 else "Instagram and Facebook Help restricted access during review. Their rows are working canvases, with current upload requirements unconfirmed.")
        elif page == 2:
            banner_safe_area(c, top + 4)
        elif page == 3:
            callout(c, top + 1, "RESIZE WITH SQUAREPIC",
                    "Open squarepic.io to resize, crop or make an image square. Use custom dimensions when a tool preset differs from the platform source.")
            c.linkURL(SITE, (M, H - top - 65, W - M, H - top - 5), relative=0)
        else:
            callout(c, top + 1, "CHECK THE CROP",
                    "Keep important text and faces away from the edges. App controls, profile photos and invite overlays can hide artwork even at the correct dimensions.")
            ratios(c, max(top + 82, 660))
        c.showPage()
    for page, group in enumerate([DATA["platforms"][:6], DATA["platforms"][6:]], start=5):
        start_page(c, year, page, "Placement notes and sources",
                   f"Official platform documentation reviewed {UPDATE_LABEL}. Full URLs are clickable.")
        top = 183
        for item in group:
            top = source_block(c, item, top)
        assert top < H - 77, f"Source notes overflow page {page}: {top}"
        c.showPage()
    c.save()
    verify(path, guide_url, year)
    shutil.copyfile(path, PUBLIC / filename)
    # Previously shared URLs serve the new design as well.
    legacy = f"social-media-image-sizes-{year}-cheat-sheet.pdf"
    shutil.copyfile(path, PUBLIC / legacy)
    shutil.copyfile(path, OUTPUT / legacy)
    print(f"{filename}: 6 pages, {path.stat().st_size} bytes; branding, metadata, dimensions and source links verified")


def verify(path, guide_url, year):
    reader = PdfReader(path)
    text = "\n".join(page.extract_text() for page in reader.pages)
    assert len(reader.pages) == 6
    assert UPDATE_LABEL in text and str(year) in text
    assert "SquarePic" in reader.metadata.title
    assert "SquarePic" in reader.metadata.author
    links = set()
    for page in reader.pages:
        page_text = page.extract_text()
        assert "SquarePic" in page_text and "squarepic.io" in page_text
        assert guide_url in page_text, "Printouts need the full edition guide URL on every page"
        page_links = {str(a.get_object().get("/A", {}).get("/URI", "")) for a in page.get("/Annots", [])}
        assert SITE in page_links and guide_url in page_links
        links.update(page_links)
    for item in DATA["platforms"]:
        assert item["name"] in text
        for source in item["sources"]:
            assert source["url"] in text.replace("\n", "")
            assert source["url"] in links
        for row in item["rows"]:
            assert row["size"] in text and row["placement"] in text.replace("\n", " ")


if __name__ == "__main__":
    OUTPUT.mkdir(parents=True, exist_ok=True)
    PUBLIC.mkdir(parents=True, exist_ok=True)
    for edition in [2026, 2027]:
        build(edition)
