# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What is kulvioweb

Marketing website for Kulvio, a compliance SaaS platform for Chile's data protection law (Ley 21.719). Static HTML/CSS/JS site served by nginx:alpine on port 8000. No build tools, no package manager, no database. Language: Spanish (es-CL).

## Architecture

Pure static site — no framework, no bundler, no transpilation.

```
public/                 # nginx document root
├── index.html          # Landing page (hero, value props, features preview, testimonial, CTA)
├── features.html       # Detailed module cards (RAT, Riesgo, ARCOP, Brechas, etc.)
├── contact.html        # Contact form (client-side only, no backend yet)
├── css/styles.css      # Single stylesheet — all styles, all pages
├── js/main.js          # Single script — reveal animations, mobile menu, counters, form
└── img/favicon.svg     # SVG shield favicon
Dockerfile              # nginx:alpine, copies nginx.conf + public/
nginx.conf              # Listens on 8000, clean URLs, gzip, caching rules
```

Nav, mobile menu, and footer are duplicated in each HTML file (no templating). When modifying shared elements, update all three pages.

## Deployment

```bash
# Deploy (rebuild container)
bash /c/SERVERVS/scripts/deploy.sh kulvioweb

# Or push to GitHub — Actions workflow handles it automatically
git push origin main
```

No tests or linting to run. Changes are verified visually at `https://kulvioweb.conversus.digital` or `http://vsserver:8000`.

## Design System

**Fonts:** Plus Jakarta Sans (body, `--font`), Instrument Serif (display headings, `--font-display`). Loaded from Google Fonts via CSS `@import`.

**Color palette** (CSS custom properties in `:root`):
- Navy: `--navy: #1B3A5C`, `--navy-deep: #0F2440` (hero/footer backgrounds)
- Teal: `--teal: #0EA5A0` (primary accent, buttons, icons)
- Amber: `--amber: #D4A853` (secondary accent, some tags)
- Body text: `--body: #4A5568`, `--ink: #1A202C`

**CSS conventions:**
- BEM naming: `.block__element--modifier` (e.g., `.feature-card__icon`, `.btn--primary`)
- Design tokens via CSS custom properties (`--radius`, `--shadow-md`, `--transition`, etc.)
- Responsive breakpoints: 640px, 768px, 960px (mobile-first)
- Container max-width: 1200px (`--container`)

**Button variants:** `btn--primary` (teal), `btn--secondary` (outlined), `btn--navy`, `btn--outline-white`. Sizes: `btn--sm`, `btn--lg`. Modifier: `btn--block` (full-width).

## JavaScript

All JS in `public/js/main.js` — single IIFE, no dependencies.

- **Scroll reveal:** IntersectionObserver adds `.visible` class to `.reveal` elements. Variants: `.reveal--slide-left`, `.reveal--slide-right`, `.reveal--scale`, `.reveal--blur`. Delays: `.reveal-delay-1` through `.reveal-delay-5`.
- **Counter animation:** Elements with `data-count="N"` attribute animate from 0 to N on viewport entry.
- **Nav scroll:** Adds `.scrolled` class to `.nav` when page scrolls past 20px.
- **Mobile menu:** Toggle button opens `.mobile-menu` overlay with `.open` class.
- **Noise overlay:** Programmatic SVG noise texture appended to body.
- **Contact form:** Currently client-side only — `submit` hides form, shows `.form-success` element.

## Static asset versioning

CSS and JS are loaded with `?v=2` query params for cache busting. Bump the version number when making changes:
```html
<link rel="stylesheet" href="css/styles.css?v=2">
<script src="js/main.js?v=2"></script>
```

## nginx routing

Clean URLs via `try_files $uri $uri.html $uri/ =404` — `/features` serves `features.html`. Static assets cached 7 days; HTML pages are no-cache. 404s fall back to `index.html`.
