// CSS geometry matches the extension appearance/theme/border-radius.ts.
export const AVATAR_SHAPES = {
  "drop": "0 50% 50% 50%",
  "leaf": "0 50% 0 50%",
  "petal": "50% 0 50% 0",
  "blob": "30% 70% 70% 30% / 30% 30% 70% 70%",
  "arch": "50% 50% 12% 12%",
  "shield": "12% 12% 50% 50% / 12% 12% 85% 85%",
  "egg": "50% 50% 45% 45% / 65% 65% 35% 35%",
  "pebble": "65% 35% 45% 55% / 55% 45% 35% 65%",
  "pillow": "35% / 25%"
}

export const AVATAR_SHAPE_OPTIONS = ['', ...Object.keys(AVATAR_SHAPES)]
