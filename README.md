# Nexora Technologies — Website

Production-ready landing page for Nexora Technologies. Plain HTML, CSS, and
JavaScript — no build step, no framework, no dependencies to install. It can
be hosted anywhere that serves static files.

## Project structure

```
nexora-site/
├── index.html                 Main page (all content lives here)
├── favicon.svg                 Browser tab icon
├── robots.txt                  Search engine crawl rules
├── sitemap.xml                 Search engine sitemap
├── assets/
│   ├── css/
│   │   └── styles.css          All styles (light + dark mode)
│   ├── js/
│   │   └── main.js             Nav, theme toggle, scroll reveal, form UX
│   └── images/
│       └── og-image.png        Social share preview image (1200×630)
```

All internal asset paths are **relative** (e.g. `assets/css/styles.css`, not
`/assets/css/styles.css`), so the site works correctly whether it's hosted
at a root domain (`https://yourdomain.com/`) or a GitHub Pages project
subpath (`https://username.github.io/repo-name/`).

## Previewing locally

Just open `index.html` in a browser — no server or build step required.
If you'd prefer a local server (some browsers restrict certain features on
`file://` URLs):

```bash
# Python 3
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploying to GitHub Pages

### 1. Create the repository
1. Go to [github.com/new](https://github.com/new) and create a new **public**
   repository (e.g. `nexora-site`).
2. Don't initialize it with a README (you already have one here).

### 2. Push this project
From inside this folder:

```bash
git init
git add .
git commit -m "Initial production deployment"
git branch -M main
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```

### 3. Enable GitHub Pages
1. In your repository on GitHub, go to **Settings → Pages**.
2. Under **Build and deployment → Source**, choose **Deploy from a branch**.
3. Under **Branch**, select `main` and folder `/ (root)`, then **Save**.
4. Wait 1–2 minutes. GitHub will show a banner with your live URL:
   `https://<your-username>.github.io/<repo-name>/`

### 4. (Optional) Custom domain
1. Add a file named `CNAME` (no extension) to the repo root containing just
   your domain, e.g. `www.nexoratechnologies.com`.
2. At your domain registrar, create a `CNAME` record pointing
   `www` → `<your-username>.github.io`.
3. Back in **Settings → Pages**, enter the same custom domain and enable
   **Enforce HTTPS** once it's available.

### 5. After you have a live URL — update these files
The site currently uses `https://www.nexoratechnologies.com/` as a
placeholder domain in a few SEO-related spots (this is the one placeholder
intentionally left in place, since the real domain wasn't set yet). Once
you know your real URL (GitHub Pages URL or custom domain), update it in:

- `index.html` — `<link rel="canonical">`, `og:url`, `og:image`,
  `twitter:image`
- `robots.txt` — the `Sitemap:` line
- `sitemap.xml` — the `<loc>` value

A quick way to update all of them: search the project for
`nexoratechnologies.com` and replace with your actual domain.

## Updating contact details or copy later
Everything lives in plain HTML in `index.html` — no build step, so any edit
is just a text change followed by a `git commit` + `git push`. GitHub Pages
redeploys automatically within a minute or two of pushing to `main`.

## Notes on third-party dependencies
- **Icons** are inlined directly as SVG markup in `index.html` — there is no
  external icon script or CDN dependency. The site renders correctly with
  zero network requests other than the two below.
- **Fonts** (Sora, Inter, JetBrains Mono) load from Google Fonts via
  `<link>` tags with `preconnect` for performance. If you'd like a fully
  offline/self-hosted page, these can be downloaded and served locally.
