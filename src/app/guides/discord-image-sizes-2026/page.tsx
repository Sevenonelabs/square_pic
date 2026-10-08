import { pageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbSchema, ArticleSchema, FAQPageSchema } from "@/components/schema-scripts";
import { ShareButtons } from "@/components/guides/share-buttons";
import { RelatedGuides } from "@/components/guides/related-guides";
import { SITE_URL as SITE } from "@/lib/constants";

const PATH = "/guides/discord-image-sizes-2026";
const TITLE = "Discord Server Banner Size & Invite Splash";
const DESCRIPTION = "Find Discord server banner size, invite splash dimensions and server icon presets. Check Boost access and troubleshoot an image missing from your invite link.";
const SOURCES = {
  banners: "https://support.discord.com/hc/en-us/articles/360028716472-Server-Banners",
  invites: "https://support.discord.com/hc/en-us/articles/4415841146391-Server-Invite-Background",
  boosts: "https://support.discord.com/hc/en-us/articles/360028038352-Server-Boosting-FAQ",
  serverProfile: "https://support.discord.com/hc/en-us/articles/30715364399511-Server-Profile",
  userProfile: "https://support.discord.com/hc/en-us/articles/4403147417623-Custom-Profiles",
  emoji: "https://support.discord.com/hc/en-us/articles/360041139231-How-to-Add-Emojis-on-Discord",
  stickers: "https://support.discord.com/hc/en-us/articles/4402687377815-Tips-for-Sticker-Creators-FAQ",
};
const linkClass = "text-[var(--accent)] hover:underline";
const headingClass = "text-[1.2rem] font-extrabold text-[#e6edf5] mt-8 mb-3";
const paragraphClass = "text-[0.95rem] text-[#8d9aaa] leading-relaxed mb-4";

export const metadata: Metadata = pageMetadata({
  title: TITLE, description: DESCRIPTION, path: PATH,
  image: "/og/og-discord-image-sizes.png", article: true, publishedTime: "2026-07-19",
});

const FAQ_QUESTIONS = [
  { question: "What size should a Discord server banner be?", answer: "Use at least 960 × 540 pixels at 16:9. Discord also accepts 1920 × 1080 and resizes it. A static channel-list banner normally requires Boost Level 2; animation requires Level 3. Partner servers can have banner access without buying a Boost level." },
  { question: "What size is a Discord server invite splash?", answer: "Discord specifies 1920 × 1080 pixels for the Server Invite Background. Use JPG or PNG. This Level 1 perk appears behind the invite pop-up and cannot be an animated GIF." },
  { question: "Why is my Discord server splash image not showing on an invite link?", answer: "Check that you saved the image as the Server Invite Background, then open the invite in a private browser window. A channel-list banner and a Server Profile header are separate placements. Check the current Boost level and the JPG or PNG file at 1920 × 1080. If it still fails, report the affected invite and client to Discord Support." },
  { question: "What is the best size for a Discord server icon?", answer: "SquarePic offers a 512 × 512 square preset for server icons and avatars. This is a working size, not a required dimension published in the Discord Server Profile article. Center the subject and check the small icon preview." },
  { question: "What size should a Discord user profile banner be?", answer: "Discord's current Custom Profiles article specifies at least 680 × 240 pixels, under 10 MB, in PNG, JPG, or animated GIF format. Uploading a profile banner requires Nitro. This is separate from a server's 16:9 banner." },
];
const IMAGE_SIZES = [
  ["Server banner", "960 × 540 minimum", "16:9", "Channel list; static at Level 2, animated at Level 3"],
  ["Server invite background / splash", "1920 × 1080", "16:9", "Behind invite pop-up; Level 1; JPG or PNG"],
  ["User profile banner", "680 × 240 minimum", "17:6 at minimum size", "Personal profile; Nitro; under 10 MB"],
  ["Server icon / avatar", "512 × 512 working preset", "1:1", "SquarePic preset; preview the circular display"],
  ["Custom emoji", "128 × 128 recommended", "1:1", "Under 256 KB; displayed smaller in chat"],
  ["Custom sticker", "320 × 320 exactly", "1:1", "PNG or APNG; maximum 512 KB"],
];

export default function DiscordImageSizesPage() {
  return <>
    <BreadcrumbSchema items={[
      { name: "Home", url: SITE }, { name: "Guides", url: `${SITE}/guides` },
      { name: "Discord image sizes", url: `${SITE}${PATH}` },
    ]} />
    <ArticleSchema type="BlogPosting" title={TITLE} description={DESCRIPTION} url={`${SITE}${PATH}`}
      imageUrl={`${SITE}/og/og-discord-image-sizes.png`} datePublished="2026-07-19" dateModified="2026-10-08"
      authorName="SevenOneLabs" authorUrl={`${SITE}/author/sevenonelabs`} />
    <FAQPageSchema questions={FAQ_QUESTIONS} />
    <article className="max-w-[680px] w-full mx-auto px-4 py-8">
      <div className="mb-8">
        <span className="text-[0.6rem] font-bold tracking-[0.12em] text-[var(--accent)]">Discord</span>
        <h1 className="text-[1.8rem] font-extrabold tracking-tight mt-3 mb-2">{TITLE}</h1>
        <p className="text-[0.78rem] text-[#576675]">Published July 19, 2026 · Updated October 8, 2026 · by <Link href="/author/sevenonelabs" className={linkClass}>SevenOneLabs</Link></p>
        <ShareButtons path={PATH} title={TITLE} />
      </div>
      <p className={paragraphClass}>A Discord server banner uses a 16:9 image of at least <strong className="text-[#e6edf5]">960 × 540 pixels</strong>.
        The invite splash is a different upload at <strong className="text-[#e6edf5]">1920 × 1080</strong>.
        Choose the placement first: a picture above the channel list, a background behind an invite, and a personal profile banner use different settings.</p>
      <nav aria-label="In this Discord guide" className="flex flex-wrap gap-x-4 gap-y-2 text-[0.85rem] mb-6">
        <a href="#server-banner" className={linkClass}>Server banner size</a>
        <a href="#invite-splash" className={linkClass}>Invite splash size</a>
        <a href="#splash-not-showing" className={linkClass}>Splash not showing?</a>
        <a href="#resize-workflow" className={linkClass}>Resize an image</a>
      </nav>
      <h2 className={headingClass}>Discord image sizes and placements</h2>
      <div className="overflow-x-auto mb-6">
        <table className="w-full text-[0.85rem] border-collapse">
          <caption className="text-left text-[#8d9aaa] mb-3">Specifications checked against Discord Help on October 7, 2026. Icon sizes are working presets.</caption>
          <thead><tr className="border-b border-white/10">
            {["Image", "Pixels", "Ratio", "Placement and access"].map(label => <th key={label} scope="col" className="text-left text-[#e6edf5] py-2 pr-3">{label}</th>)}
          </tr></thead>
          <tbody>{IMAGE_SIZES.map(([name, size, ratio, note]) => <tr key={name} className="border-b border-white/5">
            <th scope="row" className="text-left text-[var(--accent)] font-semibold py-3 pr-3">{name}</th>
            <td className="text-[#8d9aaa] py-3 pr-3">{size}</td><td className="text-[#8d9aaa] py-3 pr-3">{ratio}</td><td className="text-[#8d9aaa] py-3">{note}</td>
          </tr>)}</tbody>
        </table>
      </div>
      <h2 id="server-banner" className={headingClass}>Discord server banner size and Boost requirements</h2>
      <p className={paragraphClass}>The channel-list banner normally unlocks at Boost Level 2; animated banners unlock at Level 3.
        Partner servers can have the banner perk without purchasing a Boost level.
        Discord accepts 1920 × 1080 artwork as well as 960 × 540 and resizes it.
        Keep the top 48 pixels simple so the server name remains readable, and avoid embedding small text.
        See <a href={SOURCES.banners} className={linkClass}>Discord&apos;s server banner guidelines</a> and the <a href={SOURCES.boosts} className={linkClass}>current Boost perks</a>.</p>
      <p className={paragraphClass}>A 1600 × 900 source already has the right 16:9 shape.
        A 1200 × 800 photograph is 3:2: filling a 960 × 540 frame trims its top and bottom.
        Fit it with background instead if those edges matter. Use the <Link href="/image-size-calculator" className={linkClass}>aspect ratio calculator</Link> to compare dimensions before exporting.</p>
      <h2 id="invite-splash" className={headingClass}>Server invite splash size and format</h2>
      <p className={paragraphClass}>For the Server Invite Background, use 1920 × 1080 in JPG or PNG.
        The perk starts at Boost Level 1 and continues at higher levels. GIF animation is not supported here.
        Keep essential detail away from the middle where the invite pop-up covers the background.
        The <a href={SOURCES.invites} className={linkClass}>official invite-background guide</a> explains the upload and private-window preview.</p>
      <h2 id="splash-not-showing" className={headingClass}>Why is my server splash not showing on an invite link?</h2>
      <p className={paragraphClass}>Start by identifying the preview you are looking at. An invite background, a channel-list banner, and a Server Profile header are separate placements. A missing image does not by itself prove the file is the wrong size.</p>
      <ol className="text-[0.95rem] text-[#8d9aaa] leading-relaxed list-decimal pl-5 space-y-3 mb-4">
        <li>Check the saved upload in Server Settings. Discord&apos;s invite-background article places it under Overview → Server Invite Background. Uploading to Server Banner Background changes a different image.</li>
        <li>Confirm that the server still has the invite-background perk in its current Boost settings. A personal Nitro subscription does not replace the server&apos;s Boost level.</li>
        <li>Open the actual invite URL in a private browser window. Compare the background behind the invite pop-up with the preview in settings; do not judge it only from a link card in chat.</li>
        <li>Check the file dimensions and format. Re-export a static JPG or PNG at 1920 × 1080, upload it again, and save any pending changes.</li>
        <li>If you are viewing a Server Profile, check that placement separately. Discord documents a color header, with a custom banner for discoverable servers. See the <a href={SOURCES.serverProfile} className={linkClass}>Server Profile help page</a> for its visibility settings.</li>
      </ol>
      <p className={paragraphClass}>These checks narrow down a placement, access, or file problem; they do not guarantee a fix for every client.
        If the saved image appears in settings but remains absent from the invite pop-up, compare browser and app previews and send the affected invite, client version, and screenshots to <a href="https://support.discord.com/hc/en-us/requests/new" className={linkClass}>Discord Support</a>.</p>
      <h2 className={headingClass}>Profile banners, icons, emoji, and stickers</h2>
      <p className={paragraphClass}>Personal profile banners are separate from server artwork.
        Discord&apos;s <a href={SOURCES.userProfile} className={linkClass}>Custom Profiles article</a> now specifies at least 680 × 240 pixels, under 10 MB, as PNG, JPG, or animated GIF, with Nitro required.
        Older 600 × 240 advice does not match that current article. Review Discord&apos;s crop preview before saving.</p>
      <p className={paragraphClass}>For server icons and avatars, SquarePic&apos;s 512 × 512 preset is a practical square canvas, not an official minimum from the Server Profile article.
        Keep a face or logo centered and check it at a small display size. To preserve the full image with background, follow the <Link href="/guides/make-image-square-without-cropping" className={linkClass}>square-photo guide</Link>.</p>
      <p className={paragraphClass}>Discord recommends 128 × 128 emoji artwork and a file smaller than 256 KB in its <a href={SOURCES.emoji} className={linkClass}>emoji upload guidance</a>.
        Its <a href={SOURCES.stickers} className={linkClass}>sticker requirements</a> specify exactly 320 × 320, a maximum of 512 KB, and PNG for static or APNG for animated stickers.
        Do not use chat attachment limits as the limits for these assets.</p>
      <h2 id="resize-workflow" className={headingClass}>How to resize a Discord banner or splash with SquarePic</h2>
      <p className={paragraphClass}>Review method: SevenOneLabs compares the linked Discord Help references with SquarePic&apos;s presets and decoded downloads. The guide separates server access from image dimensions; the upload preview remains a separate check.</p>
      <ol className="text-[0.95rem] text-[#8d9aaa] leading-relaxed list-decimal pl-5 space-y-2 mb-4">
        <li>Open the <Link href="/resize/discord?preset=serverBanner#resizer" className={linkClass}>960 × 540 server-banner editor</Link> or the <Link href="/resize/discord?preset=serverSplash#resizer" className={linkClass}>1920 × 1080 invite-background editor</Link>.</li>
        <li>Select your source image. The chosen Discord preset is already selected; confirm its export dimensions.</li>
        <li>Choose Solid or Blur to fit the photo with background at 100% zoom. Choose Crop to fill the frame by trimming edges.</li>
        <li>Download as JPG or PNG, then upload to the matching Discord setting and check its preview.</li>
      </ol>
      <p className={paragraphClass}>SquarePic exports still images. It does not create animated GIF banners or APNG stickers.
        Use the <Link href="/compressor" className={linkClass}>image compressor</Link> if a static upload is too large, or the <Link href="/converter" className={linkClass}>format converter</Link> to prepare a JPG or PNG.
        Check the final file size after processing.</p>
      <h2 className={headingClass}>Frequently asked questions</h2>
      {FAQ_QUESTIONS.map(({ question, answer }) => <section key={question} className="mb-5">
        <h3 className="text-[1rem] font-bold text-[#e6edf5] mb-2">{question}</h3>
        <p className={paragraphClass}>{answer}</p>
      </section>)}
      <RelatedGuides current="discord-image-sizes-2026" />
      <Link href="/resize/discord?preset=serverBanner#resizer" className="inline-flex bg-[var(--accent)] text-black px-6 py-3 rounded-md font-bold mt-6">Prepare a Discord server banner</Link>
    </article>
  </>;
}
