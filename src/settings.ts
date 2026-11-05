// biome-ignore lint/correctness/noUndeclaredDependencies: the extension host provides vscode at runtime.
import * as vscode from 'vscode';
import type { Theme } from './presets';
import {
  EXTENSION_SCOPES,
  SCOPE_MAP,
  type TextMateRule,
  type TokenColorCustomizations,
  type TokenType,
} from './scopes';

function setTokenRule(
  rules: TextMateRule[],
  tokenType: TokenType,
  color: string
): void {
  const scope = SCOPE_MAP[tokenType];
  console.log(`Updating ${tokenType} (${scope}) to ${color}`);

  const existingRuleIndex = rules.findIndex(
    (rule) =>
      rule.scope === scope ||
      (Array.isArray(rule.scope) && rule.scope.includes(scope))
  );

  const newRule: TextMateRule = {
    scope,
    settings: {
      foreground: color,
    },
  };

  if (existingRuleIndex >= 0) {
    console.log(`Updating existing rule at index ${existingRuleIndex}`);
    rules[existingRuleIndex] = newRule;
  } else {
    console.log('Adding new rule');
    rules.push(newRule);
  }
}

// Each write replaces the whole setting, so a theme is applied in a single update.
async function updateTokenColors(
  updates: [TokenType, string][]
): Promise<void> {
  try {
    const config = vscode.workspace.getConfiguration();
    const tokenColors =
      (config.get('editor.tokenColorCustomizations') as
        | TokenColorCustomizations
        | undefined) || {};

    console.log('Current tokenColors:', JSON.stringify(tokenColors, null, 2));

    if (!tokenColors.textMateRules) {
      tokenColors.textMateRules = [];
    }

    for (const [tokenType, color] of updates) {
      setTokenRule(tokenColors.textMateRules, tokenType, color);
    }

    console.log('Final tokenColors:', JSON.stringify(tokenColors, null, 2));

    await config.update(
      'editor.tokenColorCustomizations',
      tokenColors,
      vscode.ConfigurationTarget.Global
    );

    console.log('Configuration updated successfully');
  } catch (error) {
    console.error('Error updating token color:', error);
    vscode.window.showErrorMessage(`Failed to update color: ${error}`);
  }
}

export function updateTokenColor(
  tokenType: TokenType,
  color: string
): Promise<void> {
  return updateTokenColors([[tokenType, color]]);
}

export async function applyTheme(theme: Theme): Promise<void> {
  const config = vscode.workspace.getConfiguration();
  const originalFormatOnSave = config.get('editor.formatOnSave');

  try {
    if (originalFormatOnSave) {
      await config.update(
        'editor.formatOnSave',
        false,
        vscode.ConfigurationTarget.Global
      );
    }

    await updateTokenColors(Object.entries(theme) as [TokenType, string][]);
  } finally {
    if (originalFormatOnSave) {
      await config.update(
        'editor.formatOnSave',
        originalFormatOnSave,
        vscode.ConfigurationTarget.Global
      );
    }
  }
}

export async function resetToDefaults(): Promise<void> {
  const config = vscode.workspace.getConfiguration();
  const tokenColors =
    (config.get('editor.tokenColorCustomizations') as
      | TokenColorCustomizations
      | undefined) || {};

  if (tokenColors.textMateRules) {
    tokenColors.textMateRules = tokenColors.textMateRules.filter(
      (rule) =>
        !(
          EXTENSION_SCOPES.includes(rule.scope as string) ||
          (Array.isArray(rule.scope) &&
            rule.scope.some((scope) => EXTENSION_SCOPES.includes(scope)))
        )
    );

    await config.update(
      'editor.tokenColorCustomizations',
      tokenColors,
      vscode.ConfigurationTarget.Global
    );
    vscode.window.showInformationMessage('Reset to default colors');
  }
}
