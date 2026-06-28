<div align="center">

# 🎨 Aissa Slikou — Portfolio

A fast, modern, Apple-inspired developer portfolio built with **React + Vite + Tailwind CSS v4**.

[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)](https://vitejs.dev)
[![Tailwind](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

[Live Demo](https://Aissarak8.github.io/portfolio) · [Report Bug](https://github.com/Aissarak8/portfolio/issues)

</div>

---

## ✨ Features

- 🌗 **Dark / Light mode** with system-preference detection & persistence
- ⚡ **Blazing fast** — Vite build, lazy images, zero heavy deps
- 🎬 **Smooth animations** — Framer Motion scroll reveals & micro-interactions
- 🔍 **Project filtering & search** with animated grid
- 🧊 **Glassmorphism** UI + animated gradient background
- 🔗 **Live GitHub API integration** — repos, stars, followers, languages, contribution graph
- 📱 **Fully responsive** — mobile-first, works on every screen
- 🔎 **SEO optimized** — meta tags, Open Graph, Twitter cards, JSON-LD
- ♿ **Accessible** — semantic HTML, ARIA labels, reduced-motion support

## 🗂️ Sections

Hero · About · Skills · Services · Projects (with case-study modals) · Experience · Education · Certificates · GitHub Stats · Testimonials · Contact · Footer

## 🚀 Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server (http://localhost:5173)
npm run dev

# 3. Build for production
npm run build

# 4. Preview the production build
npm run preview
```

## ⚙️ Configuration

Everything is **data-driven** — edit these files, no component changes needed:

| File | What it controls |
|------|------------------|
| `src/data/profile.js` | Name, title, bio, socials, **GitHub username**, stats |
| `src/data/skills.js` | Skill bars + tech marquee |
| `src/data/projects.js` | Project cards & case studies |
| `src/data/content.js` | Services, experience, education, certificates, testimonials, timeline |

> **Set your GitHub username** in `src/data/profile.js` → `githubUsername` to light up the live GitHub section.

## 📁 Project Structure

```
portfolio/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── ui/              # Reveal, SectionHeading, Icon
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Skills.jsx
│   │   ├── Services.jsx
│   │   ├── Projects.jsx
│   │   ├── Experience.jsx
│   │   ├── Certificates.jsx
│   │   ├── GitHubStats.jsx
│   │   ├── Testimonials.jsx
│   │   ├── Contact.jsx
│   │   ├── Footer.jsx
│   │   └── Loader.jsx
│   ├── context/
│   │   └── ThemeContext.jsx
│   ├── hooks/
│   │   ├── useGitHub.js
│   │   └── useScrollSpy.js
│   ├── data/               # ← edit content here
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .github/workflows/deploy.yml
├── index.html
├── vite.config.js
└── package.json
```

## 🌐 Deployment (GitHub Pages)

**Option A — automatic (recommended):** push to `main`. The included GitHub Action builds & deploys. Enable it in **Settings → Pages → Source: GitHub Actions**.

**Option B — manual:**
```bash
npm run deploy   # builds and publishes ./dist via gh-pages
```

> Make sure `base` in `vite.config.js` matches your repo name (`/portfolio/`). For a custom domain, set `base: '/'` and add a `CNAME` file. Full guide in [`../docs/DEPLOYMENT.md`](../docs/DEPLOYMENT.md).

## 🖼️ Adding Project Screenshots

Drop images in `public/projects/` and reference them in `src/data/projects.js`:

```js
image: '/projects/swaply.png',
```

## 📄 License

MIT © [Aissa Slikou](mailto:aissaslikou2@gmail.com)
