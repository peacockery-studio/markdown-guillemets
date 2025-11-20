/**
 * Type definitions for the Markdown Guillemets extension
 */

/**
 * Represents a TextMate rule for syntax highlighting
 */
export interface TextMateRule {
  /** The scope(s) this rule applies to */
  scope: string | string[];
  /** Visual settings for tokens matching this scope */
  settings: {
    /** Foreground color in hex format (e.g., '#ff0000') */
    foreground?: string;
    /** Font style (e.g., 'bold', 'italic', 'bold italic') */
    fontStyle?: string;
  };
}

/**
 * VSCode's tokenColorCustomizations configuration
 */
export interface TokenColorCustomizations {
  /** Array of TextMate rules for custom syntax highlighting */
  textMateRules?: TextMateRule[];
  /** Additional properties allowed by VSCode */
  [key: string]: unknown;
}

/**
 * Represents a single color with its metadata
 */
export interface ColorInfo {
  /** Color scale/weight (e.g., 300, 500, 700) */
  scale: number;
  /** Hex color value (e.g., '#3b82f6') */
  hex: string;
  /** RGB color value (e.g., '59, 130, 246') */
  rgb: string;
  /** HSL color value (e.g., '217, 91%, 60%') */
  hsl: string;
}

/**
 * Available color scales for the color picker
 */
export const COLOR_SCALES = [300, 500, 700] as const;
export type ColorScale = (typeof COLOR_SCALES)[number];

/**
 * Token types that can be customized
 */
export type TokenType =
  | 'guillemets-symbol'
  | 'guillemets-text'
  | 'brackets-symbol'
  | 'brackets-text'
  | 'parentheses-symbol'
  | 'parentheses-text'
  | 'braces-symbol'
  | 'braces-text'
  | 'angle-symbol'
  | 'angle-text'
  | 'bold-text'
  | 'italic-text'
  | 'code-text'
  | 'strikethrough-text';

/**
 * Mapping from token types to TextMate scopes
 */
export const SCOPE_MAP: Record<TokenType, string> = {
  'guillemets-symbol': 'punctuation.definition.guillemets.markdown',
  'guillemets-text': 'string.quoted.guillemets.markdown',
  'brackets-symbol': 'punctuation.definition.square.markdown',
  'brackets-text': 'string.quoted.square.markdown',
  'parentheses-symbol': 'punctuation.definition.round.markdown',
  'parentheses-text': 'string.quoted.round.markdown',
  'braces-symbol': 'punctuation.definition.curly.markdown',
  'braces-text': 'string.quoted.curly.markdown',
  'angle-symbol': 'punctuation.definition.angle.markdown',
  'angle-text': 'string.quoted.angle.markdown',
  'bold-text': 'markup.bold.markdown',
  'italic-text': 'markup.italic.markdown',
  'code-text': 'markup.inline.raw.string.markdown',
  'strikethrough-text': 'markup.strikethrough.markdown',
};

/**
 * All scopes managed by this extension
 */
export const EXTENSION_SCOPES = Object.values(SCOPE_MAP);

/**
 * Represents a theme with colors for all token types
 */
export type Theme = Record<TokenType, string>;

/**
 * Selected color from the color picker
 */
export interface SelectedColor {
  /** Hex color value */
  hex: string;
  /** Human-readable color name (e.g., 'blue-500') */
  name: string;
}

/**
 * Color family option in the picker
 */
export interface ColorFamily {
  /** Display label with emoji */
  label: string;
  /** Description of the color family */
  description: string;
  /** Color family key (e.g., 'red', 'blue') */
  family: string;
}

/**
 * Color shade option in the picker
 */
export interface ColorShadeOption {
  /** Display label with preview */
  label: string;
  /** Description with intensity and hex */
  description: string;
  /** Additional detail with RGB and HSL */
  detail: string;
  /** Hex color value */
  hex: string;
  /** Color name (e.g., 'blue-500') */
  name: string;
}

/**
 * Preset theme option
 */
export interface ThemeOption {
  /** Theme name */
  label: string;
  /** Number of colors in theme */
  description: string;
  /** Preview of first colors */
  detail: string;
  /** The theme configuration */
  theme: Theme;
}
