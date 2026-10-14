# My Portfolio

A developer portfolio with a sticky profile sidebar, built with **React 19 + Vite + Tailwind CSS v4** (plain JavaScript).
Adapted from the "sidebar portfolio template" on 21st.dev.

## Run it

```bash
npm install
npm run dev      # http://localhost:5174 (next free port if busy), live reload
npm run build    # production build into dist/
npm run preview  # serve the production build on http://localhost:4174
```

## Make it yours

| What | Where |
| --- | --- |
| All text & content | `src/data/profile.js` |
| Your photo | `avatarSrc` in `profile.js`, pointing at an image in `src/assets/` (now `doggienice.jpg`); it is cropped to a square |
| Your CV | Built automatically as a designed PDF from `profile.js` (layout in `src/lib/cvPdf.jsx`). To hand out your own file instead, add `public/cv.pdf` |
| Your signature | `src/data/signature.js` (traced from `src/assets/Denz e-signature.png`) |
| Colors (accent, paper, ink) | top of `src/index.css` |
| Fonts | Poppins: `--font-heading` / `--font-sans` in `src/index.css`, weights imported in `src/main.jsx` |
| Page title, search & link previews | `seo` in `profile.js` (set `siteUrl` once live) |
| Link-preview image | `public/og.png` (1200×630) |
| Favicon / iPhone icon | `public/favicon.svg`, optional `public/apple-touch-icon.png` (180×180) |

Sections hide themselves when their list in `profile.js` is empty (e.g. `projects: []`).

## Project structure

```text
src/
  App.jsx               page layout + shared state (theme, toast, skill filter, dialog)
  index.css             theme tokens, breakpoints (wide = 560px, split = 880px), animations
  data/profile.js       ← your content
  components/           Sidebar, Navbar, Hero, HeroArt, About, Experience, Projects,
                        Education, Skills, Contact, ContactDialog, Toast, icons, …
  hooks/                theme, active section, in-view, reduced motion, clock
  lib/                  class-name helper, shared styles, date math, signature, CV builder
```
