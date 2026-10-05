import { build } from 'esbuild';
import assert from 'node:assert/strict';
import { test } from 'node:test';

// Bundle the same JSON contract import Vite uses in the browser.
const result = await build({ entryPoints: ['src/utils/themeShare.js'], bundle: true, write: false, format: 'esm', platform: 'node' });
const { decodeTheme, encodeTheme, buildSharedThemeSettings } = await import(
  `data:text/javascript;base64,${Buffer.from(result.outputFiles[0].text).toString('base64')}`
);

test('new appearance features survive preview decoding, editing and re-sharing', () => {
  const settings = {
    clock_enabled: true, music_visualizer: true, music_lyrics: true,
    web_wallpaper_id: 'aurora', web_wallpaper_values: '{"aurora":{"speed":2}}',
    hide_feed_right_column: true, hide_stories_discover: true,
    hide_profile_friends_recommendations: true, hide_promo_link: true,
    hide_open_profile_block: true, menu_items_order: ['l_msg', 'l_pr'],
    hide_profile_right_column: true, hide_channels_tab: true,
    hide_business_notifications: true, hidden_menu_items: ['l_aud'],
    page_offset_value: 0, custom_font_value: '"Шрифт", sans-serif', profile_swap_columns: true,
  };
  const decoded = decodeTheme(encodeTheme(settings));
  assert.deepEqual(decoded.settings, settings);
  assert.deepEqual(decodeTheme(encodeTheme(decoded.settings)).settings, settings);
  const patch = buildSharedThemeSettings(decoded.settings);
  assert.equal(patch.clock_settings, '{}');
  assert.equal(patch.filter_sepia, false);
  assert.equal(patch.content_width, 1100);
  assert.equal(patch.custom_background, '');
  for (const avatar_radius_shape of ['arch', 'shield', 'egg', 'pebble', 'pillow']) {
    const shared = decodeTheme(encodeTheme({ ...settings, avatar_radius_shape }));
    assert.equal(shared.settings.avatar_radius_shape, avatar_radius_shape);
    assert.equal(buildSharedThemeSettings(shared.settings).avatar_radius_shape, avatar_radius_shape);
  }
});

test('legacy aliases still decode while non-appearance keys stay excluded', () => {
  const encoded = btoa(JSON.stringify({ v: 2, p: { ca: '#123456', hct: true, hfrc: true, telegram_bot_token: 'secret' } }));
  assert.deepEqual(decodeTheme(encoded).settings, { custom_accent: '#123456', hide_channels_tab: true, hide_feed_right_column: true });
  assert.deepEqual(decodeTheme(btoa(JSON.stringify({ v: 1, p: { custom_accent: '#123456' } }))).settings, { custom_accent: '#123456' });
});

test('malformed, oversized and future payloads are rejected', () => {
  for (const payload of [null, { v: 3, p: {} }, { v: 2, p: [] }, { v: 2, p: null }]) {
    assert.equal(decodeTheme(btoa(JSON.stringify(payload))), null);
  }
  assert.equal(decodeTheme('x'.repeat(128 * 1024 + 1)), null);
});
