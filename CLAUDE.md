# SquarePic — Developer Guide

## Project
Free, privacy-first online image editing toolkit built with Next.js 16 (App Router) + TypeScript + Tailwind CSS v4.

All image processing happens client-side via HTML5 Canvas — no uploads, no watermarks, no signup.

## Commands
- `npm run dev` — Start dev server (Turbopack)
- `npm run build` — Production build
- `npm run lint` — Run ESLint

## Structure
- `src/app/` — App Router pages (home, edit, compress, convert, crop, resize, about, faq, support, privacy, terms)
- `src/components/` — UI components (editor, tools, layout, schema-scripts)
- `src/lib/` — Utilities (analytics, editor renderer, encoders, stores)
- `src/data/` — Social media presets and icon SVGs
- `public/` — Static assets (images, robots.txt, llms.txt)

## Conventions
- Server components by default; `"use client"` only for interactive tool pages
- Tailwind CSS v4 (`@import "tailwindcss"` in globals.css)
- Phosphor icons (`@phosphor-icons/react`)
- Zustand for state management
- No external SEO library — use Next.js Metadata API + inline JSON-LD
