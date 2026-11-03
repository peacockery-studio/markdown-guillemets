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

export const PRESET_THEMES: Record<string, Theme> = {
  'Default (Recommended)': {
    'guillemets-symbol': getColorByScale(colors.blue, 500),
    'guillemets-text': getColorByScale(colors.blue, 300),
    'brackets-symbol': getColorByScale(colors.emerald, 500),
    'brackets-text': getColorByScale(colors.emerald, 300),
    'parentheses-symbol': getColorByScale(colors.amber, 500),
    'parentheses-text': getColorByScale(colors.amber, 300),
    'braces-symbol': getColorByScale(colors.rose, 500),
    'braces-text': getColorByScale(colors.rose, 300),
    'angle-symbol': getColorByScale(colors.purple, 500),
    'angle-text': getColorByScale(colors.purple, 300),
    'bold-text': getColorByScale(colors.orange, 500),
    'italic-text': getColorByScale(colors.purple, 500),
    'code-text': getColorByScale(colors.green, 500),
    'strikethrough-text': getColorByScale(colors.gray, 500),
  },
  'Colorblind Friendly': {
    'guillemets-symbol': getColorByScale(colors.blue, 700),
    'guillemets-text': getColorByScale(colors.blue, 500),
    'brackets-symbol': getColorByScale(colors.orange, 700),
    'brackets-text': getColorByScale(colors.orange, 500),
    'parentheses-symbol': getColorByScale(colors.purple, 700),
    'parentheses-text': getColorByScale(colors.purple, 500),
    'braces-symbol': getColorByScale(colors.cyan, 700),
    'braces-text': getColorByScale(colors.cyan, 500),
    'angle-symbol': getColorByScale(colors.amber, 700),
    'angle-text': getColorByScale(colors.amber, 500),
    'bold-text': getColorByScale(colors.blue, 700),
    'italic-text': getColorByScale(colors.purple, 700),
    'code-text': getColorByScale(colors.orange, 700),
    'strikethrough-text': getColorByScale(colors.slate, 600),
  },
  'Ocean Breeze': {
    'guillemets-symbol': getColorByScale(colors.blue, 500),
    'guillemets-text': getColorByScale(colors.blue, 300),
    'brackets-symbol': getColorByScale(colors.cyan, 400),
    'brackets-text': getColorByScale(colors.cyan, 200),
    'parentheses-symbol': getColorByScale(colors.teal, 500),
    'parentheses-text': getColorByScale(colors.teal, 300),
    'braces-symbol': getColorByScale(colors.sky, 600),
    'braces-text': getColorByScale(colors.sky, 400),
    'angle-symbol': getColorByScale(colors.indigo, 500),
    'angle-text': getColorByScale(colors.indigo, 300),
    'bold-text': getColorByScale(colors.violet, 500),
    'italic-text': getColorByScale(colors.purple, 500),
    'code-text': getColorByScale(colors.teal, 500),
    'strikethrough-text': getColorByScale(colors.slate, 500),
  },
  'Forest Glow': {
    'guillemets-symbol': getColorByScale(colors.emerald, 500),
    'guillemets-text': getColorByScale(colors.emerald, 300),
    'brackets-symbol': getColorByScale(colors.green, 400),
    'brackets-text': getColorByScale(colors.green, 200),
    'parentheses-symbol': getColorByScale(colors.lime, 500),
    'parentheses-text': getColorByScale(colors.lime, 300),
    'braces-symbol': getColorByScale(colors.teal, 600),
    'braces-text': getColorByScale(colors.teal, 400),
    'angle-symbol': getColorByScale(colors.cyan, 500),
    'angle-text': getColorByScale(colors.cyan, 300),
    'bold-text': getColorByScale(colors.emerald, 700),
    'italic-text': getColorByScale(colors.green, 500),
    'code-text': getColorByScale(colors.lime, 500),
    'strikethrough-text': getColorByScale(colors.slate, 500),
  },
  'Sunset Vibes': {
    'guillemets-symbol': getColorByScale(colors.orange, 500),
    'guillemets-text': getColorByScale(colors.orange, 300),
    'brackets-symbol': getColorByScale(colors.amber, 400),
    'brackets-text': getColorByScale(colors.amber, 200),
    'parentheses-symbol': getColorByScale(colors.yellow, 500),
    'parentheses-text': getColorByScale(colors.yellow, 300),
    'braces-symbol': getColorByScale(colors.red, 500),
    'braces-text': getColorByScale(colors.red, 300),
    'angle-symbol': getColorByScale(colors.pink, 500),
    'angle-text': getColorByScale(colors.pink, 300),
    'bold-text': getColorByScale(colors.red, 500),
    'italic-text': getColorByScale(colors.orange, 500),
    'code-text': getColorByScale(colors.yellow, 700),
    'strikethrough-text': getColorByScale(colors.gray, 500),
  },
  'Royal Purple': {
    'guillemets-symbol': getColorByScale(colors.purple, 500),
    'guillemets-text': getColorByScale(colors.purple, 300),
    'brackets-symbol': getColorByScale(colors.violet, 400),
    'brackets-text': getColorByScale(colors.violet, 200),
    'parentheses-symbol': getColorByScale(colors.fuchsia, 500),
    'parentheses-text': getColorByScale(colors.fuchsia, 300),
    'braces-symbol': getColorByScale(colors.pink, 600),
    'braces-text': getColorByScale(colors.pink, 400),
    'angle-symbol': getColorByScale(colors.indigo, 600),
    'angle-text': getColorByScale(colors.indigo, 400),
    'bold-text': getColorByScale(colors.purple, 500),
    'italic-text': getColorByScale(colors.violet, 500),
    'code-text': getColorByScale(colors.fuchsia, 500),
    'strikethrough-text': getColorByScale(colors.gray, 500),
  },
  Professional: {
    'guillemets-symbol': getColorByScale(colors.slate, 600),
    'guillemets-text': getColorByScale(colors.slate, 400),
    'brackets-symbol': getColorByScale(colors.gray, 500),
    'brackets-text': getColorByScale(colors.gray, 300),
    'parentheses-symbol': getColorByScale(colors.zinc, 600),
    'parentheses-text': getColorByScale(colors.zinc, 400),
    'braces-symbol': getColorByScale(colors.neutral, 700),
    'braces-text': getColorByScale(colors.neutral, 500),
    'angle-symbol': getColorByScale(colors.stone, 600),
    'angle-text': getColorByScale(colors.stone, 400),
    'bold-text': getColorByScale(colors.slate, 500),
    'italic-text': getColorByScale(colors.gray, 500),
    'code-text': getColorByScale(colors.zinc, 500),
    'strikethrough-text': getColorByScale(colors.neutral, 500),
  },
};

function getColorByScale(colorArray: ColorInfo[], scale: number): string {
  const colorObj = colorArray.find((color) => color.scale === scale);
  return colorObj?.hex || '#FFFFFF';
}
