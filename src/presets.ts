import { colors } from './colors';
import type { TokenType } from './scopes';

export interface ColorInfo {
  hex: string;
  hsl: string;
  oklch?: string;
  rgb: string;
  scale: number;
}

export type Theme = Record<TokenType, string>;

// Picker order lives here because the theme table's keys are kept sorted.
export const PRESET_THEME_ORDER = [
  'Default (Recommended)',
  'Colorblind Friendly',
  'Ocean Breeze',
  'Forest Glow',
  'Sunset Vibes',
  'Royal Purple',
  'Professional',
] as const;

type PresetThemeName = (typeof PRESET_THEME_ORDER)[number];

export const PRESET_THEMES: Record<PresetThemeName, Theme> = {
  'Colorblind Friendly': {
    'angle-symbol': getColorByScale(colors.amber, 700),
    'angle-text': getColorByScale(colors.amber, 500),
    'bold-text': getColorByScale(colors.blue, 700),
    'braces-symbol': getColorByScale(colors.cyan, 700),
    'braces-text': getColorByScale(colors.cyan, 500),
    'brackets-symbol': getColorByScale(colors.orange, 700),
    'brackets-text': getColorByScale(colors.orange, 500),
    'code-text': getColorByScale(colors.orange, 700),
    'guillemets-symbol': getColorByScale(colors.blue, 700),
    'guillemets-text': getColorByScale(colors.blue, 500),
    'italic-text': getColorByScale(colors.purple, 700),
    'parentheses-symbol': getColorByScale(colors.purple, 700),
    'parentheses-text': getColorByScale(colors.purple, 500),
    'strikethrough-text': getColorByScale(colors.slate, 600),
  },
  'Default (Recommended)': {
    'angle-symbol': getColorByScale(colors.purple, 500),
    'angle-text': getColorByScale(colors.purple, 300),
    'bold-text': getColorByScale(colors.orange, 500),
    'braces-symbol': getColorByScale(colors.rose, 500),
    'braces-text': getColorByScale(colors.rose, 300),
    'brackets-symbol': getColorByScale(colors.emerald, 500),
    'brackets-text': getColorByScale(colors.emerald, 300),
    'code-text': getColorByScale(colors.green, 500),
    'guillemets-symbol': getColorByScale(colors.blue, 500),
    'guillemets-text': getColorByScale(colors.blue, 300),
    'italic-text': getColorByScale(colors.purple, 500),
    'parentheses-symbol': getColorByScale(colors.amber, 500),
    'parentheses-text': getColorByScale(colors.amber, 300),
    'strikethrough-text': getColorByScale(colors.gray, 500),
  },
  'Forest Glow': {
    'angle-symbol': getColorByScale(colors.cyan, 500),
    'angle-text': getColorByScale(colors.cyan, 300),
    'bold-text': getColorByScale(colors.emerald, 700),
    'braces-symbol': getColorByScale(colors.teal, 600),
    'braces-text': getColorByScale(colors.teal, 400),
    'brackets-symbol': getColorByScale(colors.green, 400),
    'brackets-text': getColorByScale(colors.green, 200),
    'code-text': getColorByScale(colors.lime, 500),
    'guillemets-symbol': getColorByScale(colors.emerald, 500),
    'guillemets-text': getColorByScale(colors.emerald, 300),
    'italic-text': getColorByScale(colors.green, 500),
    'parentheses-symbol': getColorByScale(colors.lime, 500),
    'parentheses-text': getColorByScale(colors.lime, 300),
    'strikethrough-text': getColorByScale(colors.slate, 500),
  },
  'Ocean Breeze': {
    'angle-symbol': getColorByScale(colors.indigo, 500),
    'angle-text': getColorByScale(colors.indigo, 300),
    'bold-text': getColorByScale(colors.violet, 500),
    'braces-symbol': getColorByScale(colors.sky, 600),
    'braces-text': getColorByScale(colors.sky, 400),
    'brackets-symbol': getColorByScale(colors.cyan, 400),
    'brackets-text': getColorByScale(colors.cyan, 200),
    'code-text': getColorByScale(colors.teal, 500),
    'guillemets-symbol': getColorByScale(colors.blue, 500),
    'guillemets-text': getColorByScale(colors.blue, 300),
    'italic-text': getColorByScale(colors.purple, 500),
    'parentheses-symbol': getColorByScale(colors.teal, 500),
    'parentheses-text': getColorByScale(colors.teal, 300),
    'strikethrough-text': getColorByScale(colors.slate, 500),
  },
  Professional: {
    'angle-symbol': getColorByScale(colors.stone, 600),
    'angle-text': getColorByScale(colors.stone, 400),
    'bold-text': getColorByScale(colors.slate, 500),
    'braces-symbol': getColorByScale(colors.neutral, 700),
    'braces-text': getColorByScale(colors.neutral, 500),
    'brackets-symbol': getColorByScale(colors.gray, 500),
    'brackets-text': getColorByScale(colors.gray, 300),
    'code-text': getColorByScale(colors.zinc, 500),
    'guillemets-symbol': getColorByScale(colors.slate, 600),
    'guillemets-text': getColorByScale(colors.slate, 400),
    'italic-text': getColorByScale(colors.gray, 500),
    'parentheses-symbol': getColorByScale(colors.zinc, 600),
    'parentheses-text': getColorByScale(colors.zinc, 400),
    'strikethrough-text': getColorByScale(colors.neutral, 500),
  },
  'Royal Purple': {
    'angle-symbol': getColorByScale(colors.indigo, 600),
    'angle-text': getColorByScale(colors.indigo, 400),
    'bold-text': getColorByScale(colors.purple, 500),
    'braces-symbol': getColorByScale(colors.pink, 600),
    'braces-text': getColorByScale(colors.pink, 400),
    'brackets-symbol': getColorByScale(colors.violet, 400),
    'brackets-text': getColorByScale(colors.violet, 200),
    'code-text': getColorByScale(colors.fuchsia, 500),
    'guillemets-symbol': getColorByScale(colors.purple, 500),
    'guillemets-text': getColorByScale(colors.purple, 300),
    'italic-text': getColorByScale(colors.violet, 500),
    'parentheses-symbol': getColorByScale(colors.fuchsia, 500),
    'parentheses-text': getColorByScale(colors.fuchsia, 300),
    'strikethrough-text': getColorByScale(colors.gray, 500),
  },
  'Sunset Vibes': {
    'angle-symbol': getColorByScale(colors.pink, 500),
    'angle-text': getColorByScale(colors.pink, 300),
    'bold-text': getColorByScale(colors.red, 500),
    'braces-symbol': getColorByScale(colors.red, 500),
    'braces-text': getColorByScale(colors.red, 300),
    'brackets-symbol': getColorByScale(colors.amber, 400),
    'brackets-text': getColorByScale(colors.amber, 200),
    'code-text': getColorByScale(colors.yellow, 700),
    'guillemets-symbol': getColorByScale(colors.orange, 500),
    'guillemets-text': getColorByScale(colors.orange, 300),
    'italic-text': getColorByScale(colors.orange, 500),
    'parentheses-symbol': getColorByScale(colors.yellow, 500),
    'parentheses-text': getColorByScale(colors.yellow, 300),
    'strikethrough-text': getColorByScale(colors.gray, 500),
  },
};

export function presetThemeOptions() {
  return PRESET_THEME_ORDER.map((name) => {
    const theme = PRESET_THEMES[name];
    return {
      description: `${Object.keys(theme).length} colors`,
      detail: `Guillemets: ${theme['guillemets-symbol']} • Brackets: ${theme['brackets-symbol']}`,
      label: name,
      theme,
    };
  });
}

function getColorByScale(colorArray: ColorInfo[], scale: number): string {
  const colorObj = colorArray.find((color) => color.scale === scale);
  return colorObj?.hex || '#FFFFFF';
}
