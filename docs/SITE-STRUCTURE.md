# Site Structure: SquarePic

## Current Architecture

```
/ (home)                    Tool-as-hero layout, square image editor
├── /edit                   Full square editor with canvas
├── /compressor             Image compressor tool
├── /converter              Image converter tool
├── /cropper                Photo cropper tool
├── /resize                 Redirects to /
│   └── /resize/[platform]  Platform image size guides (13 pages)
├── /about                  About page
├── /faq                    FAQ page
├── /support                Support/help page
├── /privacy                Privacy policy
└── /terms                  Terms of service
```

---

## Proposed Architecture

```
/ (home)                    Pillar: tool landing + hero layout
│
├── /edit                   Square image editor (tool page)
│   ├── /edit/instagram     Instagram-specific square presets
│   └── /edit/facebook      Facebook-specific square presets
│
├── /resize                 Image resizer (tool page)
│   └── /resize/[platform]  Platform size guides (13 pages, enhanced)
│
├── /crop                   Photo cropper (tool page)
│
├── /compress               Image compressor (tool page)
│
├── /convert                Image converter (tool page)
│   ├── /convert/jpg-to-png Format-specific tool pages
│   ├── /convert/png-to-webp
│   ├── /convert/heic-to-jpg
│   └── /convert/...        (all 56 format pairs when scaled)
│
├── /blog/                  Content hub (NEW)
│   ├── /blog/social-media-image-sizes    Pillar: Social media size guide
│   │   ├── /blog/instagram-image-size    Cluster: Instagram
│   │   ├── /blog/linkedin-image-size     Cluster: LinkedIn
│   │   ├── /blog/twitter-image-size      Cluster: X/Twitter
│   │   └── /blog/[platform]-image-size   (all 13 platforms)
│   │
│   ├── /blog/image-formats              Pillar: Image format guide
│   │   ├── /blog/webp-vs-png            Cluster: Format comparisons
│   │   ├── /blog/avif-vs-jpeg
│   │   ├── /blog/jpg-vs-png
│   │   └── /blog/lossy-vs-lossless
│   │
│   ├── /blog/privacy                    Pillar: Privacy-first editing (NEW)
│   │   ├── /blog/no-upload-image-editor     Cluster: Privacy
│   │   ├── /blog/client-side-image-processing
│   │   └── /blog/best-offline-image-editors
│   │
│   ├── /blog/how-to                     Pillar: How-to guides (NEW)
│   │   ├── /blog/how-to-square-image
│   │   ├── /blog/how-to-compress-image
│   │   └── /blog/...
│   │
│   └── /blog/comparisons               Pillar: Comparison pages (NEW)
│       ├── /blog/squarepic-vs-iloveimg
│       └── /blog/best-free-photo-editors-no-signup
│
├── /guides/                Static guides (NEW)
│   ├── /guides/social-media-image-sizes-2026    Ultimate guide
│   └── /guides/image-compression-complete-guide
│
├── /tools                  Tool hub index (NEW)
│
├── /about                  About page (enhanced with team bios)
│   └── /about/team         Team bios with Person schema (NEW)
│
├── /faq                    FAQ page (expanded)
│
├── /support                Support/help page
│
├── /privacy                Privacy policy
│
└── /terms                  Terms of service
```

---

## URL Hierarchy Principles

1. **Flat where possible** (`/compress` not `/tools/compress`)
2. **Content clusters** under `/blog/` with topic pillars
3. **Tool pages** at top level for shortest paths
4. **Format-specific pages** nested under `/convert/` for scale
5. **All URLs** lowercase, hyphen-separated, no trailing slashes

---

## Sitemap Structure

### Static Pages (Priority: 1.0-0.7)

| URL | Priority | Change Frequency |
|---|---|---|
| `/` | 1.0 | Weekly |
| `/edit` | 0.9 | Weekly |
| `/compress` | 0.9 | Weekly |
| `/convert` | 0.9 | Weekly |
| `/crop` | 0.9 | Weekly |
| `/resize` | 0.8 | Weekly |
| `/resize/instagram` | 0.8 | Weekly |
| `/resize/facebook` | 0.8 | Weekly |
| (all 13 platform pages) | 0.8 | Weekly |

### Blog Pages (Priority: 0.6-0.4)

| URL | Priority | Change Frequency |
|---|---|---|
| `/blog/` | 0.7 | Daily |
| `/blog/social-media-image-sizes` | 0.6 | Monthly |
| `/blog/instagram-image-size` | 0.5 | Monthly |
| `/blog/image-formats-guide` | 0.5 | Monthly |
| `/blog/privacy-first-image-editing` | 0.5 | Monthly |
| (all blog posts) | 0.4 | Monthly |

### Utility Pages (Priority: 0.3)

| URL | Priority | Change Frequency |
|---|---|---|
| `/about` | 0.3 | Yearly |
| `/faq` | 0.5 | Monthly |
| `/support` | 0.3 | Yearly |
| `/privacy` | 0.2 | Yearly |
| `/terms` | 0.2 | Yearly |

---

## Internal Linking Strategy

### Navigational
- **Navbar:** All tool pages + Blog + About
- **Footer:** All static pages, social links, GitHub repo
- **Sidebar:** (on edit page) tool navigation

### Contextual (in-content)
- **Tool pages → Related blog posts:** "Learn more about [topic] in our guide →"
- **Blog posts → Tool pages:** "Try our free [tool name] →" CTAs throughout content
- **Platform pages ↔ Blog platform articles:** bidirectional linking
- **Comparison pages → Tool pages:** direct CTA to try SquarePic

### Cross-Linking (ToolLinks component)
- Bottom of every tool page: grid of all 4 tools
- Expand to include blog topic links

### Breadcrumbs
- Already implemented on most pages
- Add to all pages (including home)

---

## Content Pillars

| Pillar | Hub URL | Cluster Pages | Internal Links |
|---|---|---|---|
| Social Media Sizes | `/blog/social-media-image-sizes` | 13 platform-specific pages | Bidirectional hub ↔ cluster |
| Image Format Guide | `/blog/image-formats` | 6+ comparison articles | Links to convert tool |
| Privacy-First Editing | `/blog/privacy` | 5+ articles | Links to all tool pages |
| How-To Guides | `/blog/how-to` | 10+ tutorials | Links to relevant tool |
| Comparisons | `/blog/comparisons` | 5+ vs pages | Links to home + tool pages |

---

## Quality Gates

| Page Type | Minimum Content | Uniqueness |
|---|---|---|
| Tool page | 800 words | 100% unique |
| Blog post | 1,500 words | 100% unique |
| Platform page | 600 words + FAQ | 60%+ unique vs other platform pages |
| Comparison page | 1,200 words | 100% unique |
| About page | 400 words | 100% unique |
| Format-specific page | 500 words | 100% unique |
