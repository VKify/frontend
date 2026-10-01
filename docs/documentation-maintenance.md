# Extension documentation

The ten `/docs/*` pages share `src/data/docs.js`. Detailed RU/EN articles
added by the audit starting at extension commit
`9728d5958fb44963b5bae1a712632414ce869456` live in
`src/data/docs-current-features.js`; existing articles keep their anchors.

The audit covers dialog files (including the all-dialog library), dialog
statistics, friends audit, subscription review, saved videos, account backup,
voice and playlist downloads, mini player, lyrics, visualizer, widget stack,
clock modes, privacy acknowledgements, hiding controls, recommendation logs
and Telegram delivery. Telegram instructions explain the desktop browser
requirement, the shared configuration in More and all three tracking switches.

Run `npm run check:docs` to verify translations, unique anchors and existing
media. When the sibling extension checkout is available, the check also
validates its documentation links. Set `VKIFY_EXTENSION_DIR` for another path.
Run `npm run build` for the complete production build and prerendered routes.

Screenshots are actual renders of the current production popup, with
deterministic demo API responses and fake bot credentials. They are not live
account captures and do not demonstrate background delivery to Telegram.
To regenerate them from the extension checkout:

1. Run `npm run build:chrome`.
2. Serve `dist/chrome` with Vite preview on port 4173.
3. Run `node scripts/capture-docs-screenshots.mjs`.
4. Inspect the output in this site's `public/docs`, then run `npm run check:docs`.

`DOCS_PREVIEW_URL`, `DOCS_OUTPUT_DIR` and `PW_CHROME_PATH` can override the
preview origin, screenshot output directory and local Chrome executable.
Capture to a temporary directory while a site build is copying public assets,
then copy the inspected results into `public/docs`. The screenshot script
rejects popup error boundaries and JavaScript errors instead of saving them.
