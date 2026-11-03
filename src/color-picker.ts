import * as vscode from 'vscode';
import { colors } from './colors';
import type { ColorInfo } from './presets';
import { PRESET_THEMES } from './presets';
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
    label: 'Guillemets Symbol Color                 ',
    description: '« »',
    tokenType: 'guillemets-symbol',
  },
  {
    label: 'Guillemets Text Color                       ',
    description: '«content»',
    tokenType: 'guillemets-text',
  },
  {
    label: 'Square Brackets Symbol Color       ',
    description: '[ ]',
    tokenType: 'brackets-symbol',
  },
  {
    label: 'Square Brackets Text Color             ',
    description: '[content]',
    tokenType: 'brackets-text',
  },
  {
    label: 'Parentheses Symbol Color              ',
    description: '( )',
    tokenType: 'parentheses-symbol',
  },
  {
    label: 'Parentheses Text Color                    ',
    description: '(content)',
    tokenType: 'parentheses-text',
  },
  {
    label: 'Curly Braces Symbol Color              ',
    description: '{ }',
    tokenType: 'braces-symbol',
  },
  {
    label: 'Curly Braces Text Color                   ',
    description: '{content}',
    tokenType: 'braces-text',
  },
  {
    label: 'Angle Brackets Symbol Color          ',
    description: '< >',
    tokenType: 'angle-symbol',
  },
  {
    label: 'Angle Brackets Text Color               ',
    description: '<content>',
    tokenType: 'angle-text',
  },
  {
    label: 'Bold Text Color                                ',
    description: '**content**',
    tokenType: 'bold-text',
  },
  {
    label: 'Italic Text Color                                ',
    description: '*content*',
    tokenType: 'italic-text',
  },
  {
    label: 'Code Text Color                              ',
    description: '`content`',
    tokenType: 'code-text',
  },
  {
    label: 'Strikethrough Text Color                ',
    description: '~~content~~',
    tokenType: 'strikethrough-text',
  },
  { label: '', kind: vscode.QuickPickItemKind.Separator },
  {
    action: 'presets',
    label: 'Apply Preset Theme             ',
    description:
      'Default • Colorblind Friendly • Ocean Breeze • Forest Glow • Sunset Vibes • Royal Purple • Professional',
  },
  {
    action: 'reset',
    label: 'Reset All Colors                    ',
    description: 'Restore defaults',
  },
];

const colorFamilies: ColorFamilyOption[] = [
  {
    label: '🔴 Red',
    description: 'Warm, energetic, attention-grabbing',
    family: 'red',
  },
  {
    label: '🟠 Orange',
    description: 'Vibrant, friendly, creative',
    family: 'orange',
  },
  {
    label: '🟡 Amber',
    description: 'Warm, optimistic, warning',
    family: 'amber',
  },
  {
    label: '🟢 Green',
    description: 'Natural, success, growth',
    family: 'green',
  },
  {
    label: '🔵 Blue',
    description: 'Cool, professional, trustworthy',
    family: 'blue',
  },
  {
    label: '🟣 Purple',
    description: 'Creative, luxury, mysterious',
    family: 'purple',
  },
  {
    label: '🩷 Pink',
    description: 'Playful, feminine, soft',
    family: 'pink',
  },
  {
    label: '⚫ Slate',
    description: 'Clean, minimal, professional',
    family: 'slate',
  },
  {
    label: '⚪ Gray',
    description: 'Neutral, balanced, subtle',
    family: 'gray',
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
      label: `${preview} ${selectedFamily.family}-${color.scale}`,
      description: `${intensity} • ${color.hex.toUpperCase()}`,
      detail: `RGB: ${color.rgb} • HSL: ${color.hsl}`,
      hex: color.hex,
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
  const themeOptions = Object.entries(PRESET_THEMES).map(([name, theme]) => ({
    label: name,
    description: `${Object.keys(theme).length} colors`,
    detail: `Guillemets: ${Object.values(theme)[0]} • Brackets: ${Object.values(theme)[1]}`,
    theme,
  }));

  const selection = await vscode.window.showQuickPick(themeOptions, {
    placeHolder: 'Choose a preset theme',
  });

  if (selection) {
    await applyTheme(selection.theme);
    vscode.window.showInformationMessage(`Applied ${selection.label} theme`);
  }
}
