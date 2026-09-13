# Web wallpapers in VKify

Each web wallpaper lives in its own directory with an `index.html` and optional
Wallpaper Engine-compatible `project.json`. The site reads `general.properties`, turns
the supported entries into a normalized schema, and sends that schema to the
extension when the wallpaper is applied.

To add another configurable Web wallpaper:

1. Create an original wallpaper in `web/<wallpaper-slug>/` and add its `project.json`.
2. Include `<script src="../wallpaper-runtime.js"></script>` before the
   wallpaper's application script in its HTML entry point.
3. Add the wallpaper record (including `id` and `src`) to
   `src/data/wallpapers.js`.

No wallpaper-specific controls are needed. VKify generates controls for
`slider`, `bool`, `combo`, `textinput`, `color`, and `group` entries. Wallpaper
Engine `file` and `directory` properties are intentionally not exposed because
their native filesystem paths are unavailable to a normal browser iframe.

The shared runtime also reads the adjacent `project.json` and announces its
schema to the extension. This makes the same controls available when a user
pastes the wallpaper's `index.html` URL directly instead of installing it from
the catalog page.
