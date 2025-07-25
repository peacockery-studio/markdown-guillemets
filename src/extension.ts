import * as vscode from 'vscode';
import { colors } from './colors';

export function activate(context: vscode.ExtensionContext) {
  // Check if this is first activation
  const hasShownWelcome = context.globalState.get('hasShownWelcome', false);

  if (!hasShownWelcome) {
    showWelcomeMessage(context);
  }

  // Register color customization commands
  registerColorCommands(context);
}

async function showWelcomeMessage(context: vscode.ExtensionContext) {
  const result = await vscode.window.showInformationMessage(
    'Welcome to Markdown French Guillemets! Would you like to apply recommended color settings?',
    'Apply Settings',
    'Skip',
    "Don't Show Again"
  );

  if (result === 'Apply Settings') {
    await applyRecommendedSettings();
  } else if (result === "Don't Show Again") {
    context.globalState.update('hasShownWelcome', true);
  }
}

function registerColorCommands(context: vscode.ExtensionContext) {
  // Main color customization command
  const customizeColors = vscode.commands.registerCommand(
    'markdown-guillemets.customizeColors',
    async () => {
      const options = [
        'Guillemets Color',
        'Brackets Color',
        'Parentheses Color',
        'Braces Color',
        'Apply Preset Theme',
        'Reset to Defaults',
      ];

      const selection = await vscode.window.showQuickPick(options, {
        placeHolder: 'Choose what to customize',
      });

      switch (selection) {
        case 'Guillemets Color':
          await customizeTokenColor('guillemets');
          break;
        case 'Brackets Color':
          await customizeTokenColor('brackets');
          break;
        case 'Parentheses Color':
          await customizeTokenColor('parentheses');
          break;
        case 'Braces Color':
          await customizeTokenColor('braces');
          break;
        case 'Apply Preset Theme':
          await showPresetThemes();
          break;
        case 'Reset to Defaults':
          await resetToDefaults();
          break;
      }
    }
  );

  // Quick setup command
  const quickSetup = vscode.commands.registerCommand(
    'markdown-guillemets.quickSetup',
    async () => {
      await applyRecommendedSettings();
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

async function showTwoStepColorPicker(tokenType: string): Promise<{hex: string, name: string} | undefined> {
  // Step 1: Select color family
  const colorFamilies = [
    { label: '🔴 Red', description: 'Warm, energetic, attention-grabbing', family: 'red' },
    { label: '🟠 Orange', description: 'Vibrant, friendly, creative', family: 'orange' },
    { label: '🟡 Amber', description: 'Warm, optimistic, warning', family: 'amber' },
    { label: '🟢 Green', description: 'Natural, success, growth', family: 'green' },
    { label: '🔵 Blue', description: 'Cool, professional, trustworthy', family: 'blue' },
    { label: '🟣 Purple', description: 'Creative, luxury, mysterious', family: 'purple' },
    { label: '🩷 Pink', description: 'Playful, feminine, soft', family: 'pink' },
    { label: '⚫ Slate', description: 'Clean, minimal, professional', family: 'slate' },
    { label: '⚪ Gray', description: 'Neutral, balanced, subtle', family: 'gray' },
  ];

  const selectedFamily = await vscode.window.showQuickPick(colorFamilies, {
    placeHolder: `Choose a color family for ${tokenType}`,
    title: 'Step 1: Select Color Family'
  });

  if (!selectedFamily) return undefined;

  // Step 2: Select shade from the chosen family
  const familyColors = colors[selectedFamily.family as keyof typeof colors];
  if (!Array.isArray(familyColors)) return undefined;

  const shadeOptions = familyColors.map(color => {
    const intensity = getIntensityDescription(color.scale);
    const preview = getColorPreview(color.hex, color.scale);
    
    return {
      label: `${preview} ${selectedFamily.family}-${color.scale}`,
      description: `${intensity} • ${color.hex.toUpperCase()}`,
      detail: `RGB: ${color.rgb} • HSL: ${color.hsl}`,
      hex: color.hex,
      name: `${selectedFamily.family}-${color.scale}`
    };
  });

  const selectedShade = await vscode.window.showQuickPick(shadeOptions, {
    placeHolder: `Choose a shade of ${selectedFamily.family} for ${tokenType}`,
    title: 'Step 2: Select Color Shade'
  });

  return selectedShade ? { hex: selectedShade.hex, name: selectedShade.name } : undefined;
}

function getIntensityDescription(scale: number): string {
  if (scale <= 100) return 'Very Light';
  if (scale <= 300) return 'Light';
  if (scale <= 500) return 'Medium';
  if (scale <= 700) return 'Dark';
  return 'Very Dark';
}

function getColorPreview(hex: string, scale: number): string {
  // Create a visual representation of the color intensity
  const intensity = Math.floor(scale / 100);
  const colorChar = '●';
  
  // Use different characters based on lightness
  if (scale <= 100) return '○○○○○'; // Very light - hollow circles
  if (scale <= 200) return '●○○○○'; // Light
  if (scale <= 300) return '●●○○○'; // Light-medium  
  if (scale <= 400) return '●●●○○'; // Medium-light
  if (scale <= 500) return '●●●●○'; // Medium
  if (scale <= 600) return '●●●●●'; // Medium-dark
  if (scale <= 700) return '●●●●●'; // Dark
  if (scale <= 800) return '●●●●●'; // Very dark
  return '●●●●●'; // Darkest
}

async function showPresetThemes() {
  const themes: Record<string, Record<string, string>> = {
    'Ocean Breeze': {
      guillemets: getColorByScale(colors.blue, 500),    // Blue 500
      brackets: getColorByScale(colors.cyan, 400),      // Cyan 400  
      parentheses: getColorByScale(colors.teal, 500),   // Teal 500
      braces: getColorByScale(colors.sky, 600),         // Sky 600
    },
    'Forest Glow': {
      guillemets: getColorByScale(colors.emerald, 500), // Emerald 500
      brackets: getColorByScale(colors.green, 400),     // Green 400
      parentheses: getColorByScale(colors.lime, 500),   // Lime 500
      braces: getColorByScale(colors.teal, 600),        // Teal 600
    },
    'Sunset Vibes': {
      guillemets: getColorByScale(colors.orange, 500),  // Orange 500
      brackets: getColorByScale(colors.amber, 400),     // Amber 400
      parentheses: getColorByScale(colors.yellow, 500), // Yellow 500
      braces: getColorByScale(colors.red, 500),         // Red 500
    },
    'Royal Purple': {
      guillemets: getColorByScale(colors.purple, 500),  // Purple 500
      brackets: getColorByScale(colors.violet, 400),    // Violet 400
      parentheses: getColorByScale(colors.fuchsia, 500),// Fuchsia 500
      braces: getColorByScale(colors.pink, 600),        // Pink 600
    },
    'Professional': {
      guillemets: getColorByScale(colors.slate, 600),   // Slate 600
      brackets: getColorByScale(colors.gray, 500),      // Gray 500
      parentheses: getColorByScale(colors.zinc, 600),   // Zinc 600
      braces: getColorByScale(colors.neutral, 700),     // Neutral 700
    },
  };

  const themeOptions = Object.entries(themes).map(([name, colors]) => ({
    label: name,
    description: `${Object.keys(colors).length} colors`,
    detail: `Guillemets: ${Object.values(colors)[0]} • Brackets: ${Object.values(colors)[1]}`,
    theme: colors
  }));

  const selection = await vscode.window.showQuickPick(themeOptions, {
    placeHolder: 'Choose a preset theme',
  });

  if (selection) {
    await applyTheme(selection.theme);
    vscode.window.showInformationMessage(`Applied ${selection.label} theme`);
  }
}

function getCurrentTokenColor(tokenType: string): string {
  const config = vscode.workspace.getConfiguration();
  const tokenColors = config.get('editor.tokenColorCustomizations') as any;

  const scopeMap: Record<string, string> = {
    guillemets: 'punctuation.definition.guillemets.markdown',
    brackets: 'punctuation.definition.square.markdown',
    parentheses: 'punctuation.definition.round.markdown',
    braces: 'punctuation.definition.curly.markdown',
  };

  const scope = scopeMap[tokenType];
  if (tokenColors?.textMateRules) {
    const rule = tokenColors.textMateRules.find(
      (rule: any) =>
        rule.scope === scope ||
        (Array.isArray(rule.scope) && rule.scope.includes(scope))
    );
    return rule?.settings?.foreground || '#FFFFFF';
  }

  return '#FFFFFF';
}

async function updateTokenColor(tokenType: string, color: string) {
  try {
    const config = vscode.workspace.getConfiguration();
    const tokenColors =
      (config.get('editor.tokenColorCustomizations') as any) || {};

    console.log('Current tokenColors:', JSON.stringify(tokenColors, null, 2));

    if (!tokenColors.textMateRules) {
      tokenColors.textMateRules = [];
    }

    const scopeMap: Record<string, string> = {
      guillemets: 'punctuation.definition.guillemets.markdown',
      brackets: 'punctuation.definition.square.markdown',
      parentheses: 'punctuation.definition.round.markdown',
      braces: 'punctuation.definition.curly.markdown',
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

    console.log('Updated tokenColors:', JSON.stringify(tokenColors, null, 2));

    await config.update(
      'editor.tokenColorCustomizations',
      tokenColors,
      vscode.ConfigurationTarget.Global
    );

    console.log('Settings updated successfully');
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

async function applyRecommendedSettings() {
  const recommendedTheme = {
    guillemets: getColorByScale(colors.blue, 500),     // Professional blue
    brackets: getColorByScale(colors.emerald, 500),    // Success green
    parentheses: getColorByScale(colors.amber, 500),   // Warning amber
    braces: getColorByScale(colors.rose, 500),         // Accent rose
  };

  await applyTheme(recommendedTheme);
  vscode.window.showInformationMessage('Applied recommended color settings!');
}

function getColorByScale(colorArray: any[], scale: number): string {
  const colorObj = colorArray.find(c => c.scale === scale);
  return colorObj?.hex || '#FFFFFF';
}

async function resetToDefaults() {
  const config = vscode.workspace.getConfiguration();
  const tokenColors =
    (config.get('editor.tokenColorCustomizations') as any) || {};

  if (tokenColors.textMateRules) {
    const scopes = [
      'punctuation.definition.guillemets.markdown',
      'punctuation.definition.square.markdown',
      'punctuation.definition.round.markdown', 
      'punctuation.definition.curly.markdown',
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
