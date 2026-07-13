<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="/images/logo-icon.svg">
    <img src="/images/logo-icon.svg" width="80" height="80" alt="SquarePic">
  </picture>
  <br/>
  <strong>SquarePic</strong>
</p>

<p align="center">
  Free · Privacy-first · Online image editing toolkit
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js_16-000?logo=next.js&logoColor=fff" alt="Next.js 16">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff" alt="TypeScript">
  <img src="https://img.shields.io/badge/Tailwind_CSS_v4-06B6D4?logo=tailwindcss&logoColor=fff" alt="Tailwind CSS v4">
  <img src="https://img.shields.io/badge/license-MIT-green" alt="MIT">
</p>

---

**SquarePic** lets you square, resize, crop, compress, and convert images — all in your browser. No uploads, no watermarks, no signup.

→ [squarepic.app](https://squarepic-next.vercel.app)

## Features

| Tool | Description |
|---|---|
| **Square Image Editor** | Fit any photo into a perfect square with blur, solid fill, or smart crop |
| **Image Resizer** | Resize to exact social media dimensions (Instagram, X, LinkedIn, etc.) |
| **Photo Cropper** | Interactive crop with 8 drag handles and aspect ratio presets |
| **Image Converter** | Convert between JPEG, PNG, WebP, BMP, GIF, ICO, AVIF, TIFF (8 formats) |
| **Image Compressor** | Compress with quality slider or target-size mode; batch + ZIP export |

All processing is powered by the **HTML5 Canvas API** — your images never leave your device.

## Quick Start

```bash
npm install
npm run dev
```

Open [localhost:3000](http://localhost:3000) in your browser.

### Commands

| Command | Purpose |
|---|---|
| `npm run dev` | Start development server (Turbopack) |
| `npm run build` | Production build |
| `npm run lint` | Run ESLint |

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Animation:** Motion
- **State:** Zustand
- **Icons:** Phosphor Icons
- **Fonts:** Asap Condensed, Syne Mono

No image data is ever sent to a server. All operations run on the client.

## License

MIT — see [LICENSE](LICENSE).
