import * as vscode from 'vscode';
import { colors } from './colors';

export function activate(context: vscode.ExtensionContext) {
  try {
    console.log('Markdown Guillemets extension is now active!');
    console.log('Extension context:', context.extensionPath);

    // Register color customization commands
    registerColorCommands(context);
    console.log('Commands registered successfully');
  } catch (error) {
    console.error('Error activating Markdown Guillemets extension:', error);
    vscode.window.showErrorMessage(
      `Markdown Guillemets activation failed: ${error}`
    );
  }
}

function registerColorCommands(context: vscode.ExtensionContext) {
  // Main color customization command
  const customizeColors = vscode.commands.registerCommand(
    'markdown-guillemets.customizeColors',
    async () => {
      const options = [
        'Guillemets Symbol Color (« »)',
        'Guillemets Text Color',
        'Square Brackets Symbol Color ([ ])',
        'Square Brackets Text Color',
        'Parentheses Symbol Color (( ))',
        'Parentheses Text Color',
        'Curly Braces Symbol Color ({ })',
        'Curly Braces Text Color',
        'Angle Brackets Symbol Color (< >)',
        'Angle Brackets Text Color',
        'Apply Preset Theme',
        'Reset All Colors',
      ];

      const selection = await vscode.window.showQuickPick(options, {
        placeHolder: 'Choose what to customize',
      });

      switch (selection) {
        case 'Guillemets Symbol Color (« »)':
          await customizeTokenColor('guillemets-symbol');
          break;
        case 'Guillemets Text Color':
          await customizeTokenColor('guillemets-text');
          break;
        case 'Square Brackets Symbol Color ([ ])':
          await customizeTokenColor('brackets-symbol');
          break;
        case 'Square Brackets Text Color':
          await customizeTokenColor('brackets-text');
          break;
        case 'Parentheses Symbol Color (( ))':
          await customizeTokenColor('parentheses-symbol');
          break;
        case 'Parentheses Text Color':
          await customizeTokenColor('parentheses-text');
          break;
        case 'Curly Braces Symbol Color ({ })':
          await customizeTokenColor('braces-symbol');
          break;
        case 'Curly Braces Text Color':
          await customizeTokenColor('braces-text');
          break;
        case 'Angle Brackets Symbol Color (< >)':
          await customizeTokenColor('angle-symbol');
          break;
        case 'Angle Brackets Text Color':
          await customizeTokenColor('angle-text');
          break;
        case 'Apply Preset Theme':
          await showPresetThemes();
          break;
        case 'Reset All Colors':
          await resetToDefaults();
          break;
      }
    }
  );

  // Quick setup command (now applies the same colors as configurationDefaults)
  const quickSetup = vscode.commands.registerCommand(
    'markdown-guillemets.quickSetup',
    () => {
      vscode.window.showInformationMessage(
        'Colors are now applied automatically! Use "Customize Colors" to change them.'
      );
    }
  );

  context.subscriptions.push(customizeColors, quickSetup);
}

async function customizeTokenColor(tokenType: string) {
  const selectedColor = await showTwoStepColorPicker(tokenType);

  if (selectedColor) {
    await updateTokenColor(tokenType, selectedColor.hex);
    vscode.window.showInformationMessage(
      `${tokenType} color updated to ${selectedColor.name}`
    );
  }
}

async function showTwoStepColorPicker(
  tokenType: string
): Promise<{ hex: string; name: string } | undefined> {
  // Step 1: Select color family
  const colorFamilies = [
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

  const selectedFamily = await vscode.window.showQuickPick(colorFamilies, {
    placeHolder: `Choose a color family for ${tokenType}`,
    title: 'Step 1: Select Color Family',
  });

  if (!selectedFamily) {
    return;
  }

  // Step 2: Select shade from the chosen family
  const familyColors = colors[selectedFamily.family as keyof typeof colors];
  if (!Array.isArray(familyColors)) {
    return;
  }

  const shadeOptions = familyColors.map((color) => {
    const intensity = getIntensityDescription(color.scale);
    const preview = getColorPreview(color.hex, color.scale);

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
  if (scale <= 100) {
    return 'Very Light';
  }
  if (scale <= 300) {
    return 'Light';
  }
  if (scale <= 500) {
    return 'Medium';
  }
  if (scale <= 700) {
    return 'Dark';
  }
  return 'Very Dark';
}

function getColorPreview(_hex: string, scale: number): string {
  // Create a visual representation of the color intensity

  // Use different characters based on lightness
  if (scale <= 100) {
    return '○○○○○'; // Very light - hollow circles
  }
  if (scale <= 200) {
    return '●○○○○'; // Light
  }
  if (scale <= 300) {
    return '●●○○○'; // Light-medium
  }
  if (scale <= 400) {
    return '●●●○○'; // Medium-light
  }
  if (scale <= 500) {
    return '●●●●○'; // Medium
  }
  if (scale <= 600) {
    return '●●●●●'; // Medium-dark
  }
  if (scale <= 700) {
    return '●●●●●'; // Dark
  }
  if (scale <= 800) {
    return '●●●●●'; // Very dark
  }
  return '●●●●●'; // Darkest
}

async function showPresetThemes() {
  const themes: Record<string, Record<string, string>> = {
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
    },
  };

  const themeOptions = Object.entries(themes).map(([name, colors]) => ({
    label: name,
    description: `${Object.keys(colors).length} colors`,
    detail: `Guillemets: ${Object.values(colors)[0]} • Brackets: ${Object.values(colors)[1]}`,
    theme: colors,
  }));

  const selection = await vscode.window.showQuickPick(themeOptions, {
    placeHolder: 'Choose a preset theme',
  });

  if (selection) {
    await applyTheme(selection.theme);
    vscode.window.showInformationMessage(`Applied ${selection.label} theme`);
  }
}

async function updateTokenColor(tokenType: string, color: string) {
  try {
    console.log(`Updating token color for ${tokenType} to ${color}`);
    const config = vscode.workspace.getConfiguration();
    const tokenColors =
      (config.get('editor.tokenColorCustomizations') as any) || {};

    console.log('Current tokenColors:', JSON.stringify(tokenColors, null, 2));

    if (!tokenColors.textMateRules) {
      tokenColors.textMateRules = [];
    }

    const scopeMap: Record<string, string> = {
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
    };

    const scope = scopeMap[tokenType];
    console.log(`Updating ${tokenType} (${scope}) to ${color}`);

    const existingRuleIndex = tokenColors.textMateRules.findIndex(
      (rule: any) =>
        rule.scope === scope ||
        (Array.isArray(rule.scope) && rule.scope.includes(scope))
    );

    const newRule = {
      scope,
      settings: {
        foreground: color,
      },
    };

    if (existingRuleIndex >= 0) {
      console.log(`Updating existing rule at index ${existingRuleIndex}`);
      tokenColors.textMateRules[existingRuleIndex] = newRule;
    } else {
      console.log('Adding new rule');
      tokenColors.textMateRules.push(newRule);
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

async function applyTheme(theme: Record<string, string>) {
  for (const [tokenType, color] of Object.entries(theme)) {
    await updateTokenColor(tokenType, color);
  }
}

function getColorByScale(colorArray: any[], scale: number): string {
  const colorObj = colorArray.find((c) => c.scale === scale);
  return colorObj?.hex || '#FFFFFF';
}

async function resetToDefaults() {
  const config = vscode.workspace.getConfiguration();
  const tokenColors =
    (config.get('editor.tokenColorCustomizations') as any) || {};

  if (tokenColors.textMateRules) {
    const scopes = [
      'punctuation.definition.guillemets.markdown',
      'string.quoted.guillemets.markdown',
      'punctuation.definition.square.markdown',
      'string.quoted.square.markdown',
      'punctuation.definition.round.markdown',
      'string.quoted.round.markdown',
      'punctuation.definition.curly.markdown',
      'string.quoted.curly.markdown',
      'punctuation.definition.angle.markdown',
      'string.quoted.angle.markdown',
    ];

    tokenColors.textMateRules = tokenColors.textMateRules.filter(
      (rule: any) =>
        !(
          scopes.includes(rule.scope) ||
          (Array.isArray(rule.scope) &&
            rule.scope.some((s: string) => scopes.includes(s)))
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

export function deactivate() {}
