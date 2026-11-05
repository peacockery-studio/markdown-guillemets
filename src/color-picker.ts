// biome-ignore lint/correctness/noUndeclaredDependencies: the extension host provides vscode at runtime.
import * as vscode from 'vscode';
import { colors } from './colors';
import type { ColorInfo } from './presets';
import { presetThemeOptions } from './presets';
import type { TokenType } from './scopes';
import { applyTheme, resetToDefaults, updateTokenColor } from './settings';

interface SelectedColor {
  hex: string;
  name: string;
}

interface ColorFamilyOption extends vscode.QuickPickItem {
  family: string;
}

interface ColorCommandOption extends vscode.QuickPickItem {
  action?: 'presets' | 'reset';
  tokenType?: TokenType;
}

const colorCommandOptions: ColorCommandOption[] = [
  {
    description: '« »',
    label: 'Guillemets Symbol Color                 ',
    tokenType: 'guillemets-symbol',
  },
  {
    description: '«content»',
    label: 'Guillemets Text Color                       ',
    tokenType: 'guillemets-text',
  },
  {
    description: '[ ]',
    label: 'Square Brackets Symbol Color       ',
    tokenType: 'brackets-symbol',
  },
  {
    description: '[content]',
    label: 'Square Brackets Text Color             ',
    tokenType: 'brackets-text',
  },
  {
    description: '( )',
    label: 'Parentheses Symbol Color              ',
    tokenType: 'parentheses-symbol',
  },
  {
    description: '(content)',
    label: 'Parentheses Text Color                    ',
    tokenType: 'parentheses-text',
  },
  {
    description: '{ }',
    label: 'Curly Braces Symbol Color              ',
    tokenType: 'braces-symbol',
  },
  {
    description: '{content}',
    label: 'Curly Braces Text Color                   ',
    tokenType: 'braces-text',
  },
  {
    description: '< >',
    label: 'Angle Brackets Symbol Color          ',
    tokenType: 'angle-symbol',
  },
  {
    description: '<content>',
    label: 'Angle Brackets Text Color               ',
    tokenType: 'angle-text',
  },
  {
    description: '**content**',
    label: 'Bold Text Color                                ',
    tokenType: 'bold-text',
  },
  {
    description: '*content*',
    label: 'Italic Text Color                                ',
    tokenType: 'italic-text',
  },
  {
    description: '`content`',
    label: 'Code Text Color                              ',
    tokenType: 'code-text',
  },
  {
    description: '~~content~~',
    label: 'Strikethrough Text Color                ',
    tokenType: 'strikethrough-text',
  },
  { kind: vscode.QuickPickItemKind.Separator, label: '' },
  {
    action: 'presets',
    description:
      'Default • Colorblind Friendly • Ocean Breeze • Forest Glow • Sunset Vibes • Royal Purple • Professional',
    label: 'Apply Preset Theme             ',
  },
  {
    action: 'reset',
    description: 'Restore defaults',
    label: 'Reset All Colors                    ',
  },
];

const colorFamilies: ColorFamilyOption[] = [
  {
    description: 'Warm, energetic, attention-grabbing',
    family: 'red',
    label: '🔴 Red',
  },
  {
    description: 'Vibrant, friendly, creative',
    family: 'orange',
    label: '🟠 Orange',
  },
  {
    description: 'Warm, optimistic, warning',
    family: 'amber',
    label: '🟡 Amber',
  },
  {
    description: 'Natural, success, growth',
    family: 'green',
    label: '🟢 Green',
  },
  {
    description: 'Cool, professional, trustworthy',
    family: 'blue',
    label: '🔵 Blue',
  },
  {
    description: 'Creative, luxury, mysterious',
    family: 'purple',
    label: '🟣 Purple',
  },
  {
    description: 'Playful, feminine, soft',
    family: 'pink',
    label: '🩷 Pink',
  },
  {
    description: 'Clean, minimal, professional',
    family: 'slate',
    label: '⚫ Slate',
  },
  {
    description: 'Neutral, balanced, subtle',
    family: 'gray',
    label: '⚪ Gray',
  },
];

export function registerColorCommands(context: vscode.ExtensionContext): void {
  const customizeColors = vscode.commands.registerCommand(
    'markdown-guillemets.customizeColors',
    async () => {
      const selection = await vscode.window.showQuickPick(colorCommandOptions, {
        placeHolder: 'Choose what to customize',
      });

      if (!selection) {
        return;
      }

      if (selection.tokenType) {
        await customizeTokenColor(selection.tokenType);
        return;
      }

      if (selection.action === 'presets') {
        await showPresetThemes();
        return;
      }

      if (selection.action === 'reset') {
        await resetToDefaults();
      }
    }
  );

  context.subscriptions.push(customizeColors);
}

async function customizeTokenColor(tokenType: TokenType): Promise<void> {
  const selectedColor = await showTwoStepColorPicker(tokenType);

  if (selectedColor) {
    await updateTokenColor(tokenType, selectedColor.hex);
    vscode.window.showInformationMessage(
      `${tokenType} color updated to ${selectedColor.name}`
    );
  }
}

async function showTwoStepColorPicker(
  tokenType: TokenType
): Promise<SelectedColor | undefined> {
  const selectedFamily = await vscode.window.showQuickPick(colorFamilies, {
    placeHolder: `Choose a color family for ${tokenType}`,
    title: 'Step 1: Select Color Family',
  });

  if (!selectedFamily) {
    return;
  }

  const familyColors = colors[selectedFamily.family as keyof typeof colors];
  if (!Array.isArray(familyColors)) {
    return;
  }

  const filteredColors = familyColors.filter((color) =>
    [300, 500, 700].includes(color.scale)
  );

  const shadeOptions = filteredColors.map((color: ColorInfo) => {
    const intensity = getIntensityDescription(color.scale);
    const preview = getColorPreview(color.scale);

    return {
      description: `${intensity} • ${color.hex.toUpperCase()}`,
      detail: `RGB: ${color.rgb} • HSL: ${color.hsl}`,
      hex: color.hex,
      label: `${preview} ${selectedFamily.family}-${color.scale}`,
      name: `${selectedFamily.family}-${color.scale}`,
    };
  });

  const selectedShade = await vscode.window.showQuickPick(shadeOptions, {
    placeHolder: `Choose a shade of ${selectedFamily.family} for ${tokenType}`,
    title: 'Step 2: Select Color Shade',
  });

  return selectedShade
    ? { hex: selectedShade.hex, name: selectedShade.name }
    : undefined;
}

function getIntensityDescription(scale: number): string {
  if (scale === 300) {
    return 'Light';
  }
  if (scale === 500) {
    return 'Medium';
  }
  if (scale === 700) {
    return 'Dark';
  }
  return 'Unknown';
}

function getColorPreview(scale: number): string {
  if (scale === 300) {
    return '●●○○○';
  }
  if (scale === 500) {
    return '●●●●○';
  }
  if (scale === 700) {
    return '●●●●●';
  }
  return '●●●○○';
}

async function showPresetThemes(): Promise<void> {
  const selection = await vscode.window.showQuickPick(presetThemeOptions(), {
    placeHolder: 'Choose a preset theme',
  });

  if (selection) {
    await applyTheme(selection.theme);
    vscode.window.showInformationMessage(`Applied ${selection.label} theme`);
  }
}
