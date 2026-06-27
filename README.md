# Stillpoint Studio — GitHub Pages Landing Page

Static, polished, no-build website for GitHub Pages.

## Files

- `index.html` — page structure and copy
- `styles.css` — full visual system, responsive layout, animations
- `script.js` — menu, reveal effects, project filters, lightbox, cursor glow
- `assets/favicon.svg` — browser icon
- `assets/og-stillpoint.svg` — social sharing preview image
- `.nojekyll` — keeps GitHub Pages simple

## Edit before publishing

Search for these placeholders in `index.html`:

- `replace-with-your-email@example.com`
- `href="#"`

Replace with:

- your email
- your Itch page
- Instagram
- Vimeo/YouTube/portfolio/archive links

## Add real BTS images

The current stills section uses generated CSS placeholders so the page looks premium immediately.

To use real photos:

1. Create this folder:

```txt
assets/stills/
```

2. Add files like:

```txt
bts-01.jpg
bts-02.jpg
bts-03.jpg
```

3. Replace a placeholder button in `index.html` with an image, e.g.

```html
<button class="still" type="button" data-caption="Light check / blocked frame">
  <img src="assets/stills/bts-01.jpg" alt="Light check during film shoot" />
  <span>01</span>
</button>
```

4. Add this to `styles.css` if you use images:

```css
.still img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
```

## GitHub Pages publish

1. Create a GitHub repository.
2. Upload all files to the repository root.
3. Go to **Settings → Pages**.
4. Choose **Deploy from a branch**.
5. Select `main` and `/ (root)`.
6. Save.

For a main personal site, name the repository:

```txt
yourusername.github.io
```

For a project site, any repository name is fine.

## Brutal branding note

Use **Stillpoint Studio** publicly.

Use **Stillpoint** as the visual wordmark.

Do not send people to four disconnected accounts. This page is the front door until the rest of the identity stack is cleaned.
