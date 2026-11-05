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

export const SCOPE_MAP: Record<TokenType, string> = {
  'angle-symbol': 'punctuation.definition.angle.markdown',
  'angle-text': 'string.quoted.angle.markdown',
  'bold-text': 'markup.bold.markdown',
  'braces-symbol': 'punctuation.definition.curly.markdown',
  'braces-text': 'string.quoted.curly.markdown',
  'brackets-symbol': 'punctuation.definition.square.markdown',
  'brackets-text': 'string.quoted.square.markdown',
  'code-text': 'markup.inline.raw.string.markdown',
  'guillemets-symbol': 'punctuation.definition.guillemets.markdown',
  'guillemets-text': 'string.quoted.guillemets.markdown',
  'italic-text': 'markup.italic.markdown',
  'parentheses-symbol': 'punctuation.definition.round.markdown',
  'parentheses-text': 'string.quoted.round.markdown',
  'strikethrough-text': 'markup.strikethrough.markdown',
};

export const EXTENSION_SCOPES = Object.values(SCOPE_MAP);

export interface TextMateRule {
  scope: string | string[];
  settings: {
    foreground?: string;
    fontStyle?: string;
  };
}

export interface TokenColorCustomizations {
  textMateRules?: TextMateRule[];
  [key: string]: unknown;
}
