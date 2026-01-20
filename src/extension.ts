import * as vscode from "vscode";
import { colors } from "./colors";
import type {
  ColorInfo,
  ColorScale,
  SelectedColor,
  TextMateRule,
  Theme,
  TokenColorCustomizations,
  TokenType,
} from "./types";
import { COLOR_SCALES, EXTENSION_SCOPES, SCOPE_MAP } from "./types";

/**
 * Output channel for extension logging (development/debugging)
 */
let outputChannel: vscode.OutputChannel;

/**
 * Logs a message to the output channel (only in development mode)
 */
function log(message: string): void {
  if (process.env.NODE_ENV === "development" && outputChannel) {
    outputChannel.appendLine(`[${new Date().toISOString()}] ${message}`);
  }
}

export function activate(context: vscode.ExtensionContext) {
  try {
    // Create output channel for debugging (hidden by default)
    outputChannel = vscode.window.createOutputChannel("Markdown Guillemets", {
      log: true,
    });
    context.subscriptions.push(outputChannel);

    log("Markdown Guillemets extension is now active!");
    log(`Extension path: ${context.extensionPath}`);

    registerColorCommands(context);
    log("Commands registered successfully");
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    vscode.window.showErrorMessage(
      `Markdown Guillemets activation failed: ${errorMessage}`
    );
  }
}

function registerColorCommands(context: vscode.ExtensionContext) {
  const customizeColors = vscode.commands.registerCommand(
    "markdown-guillemets.customizeColors",
    async () => {
      const options = [
        {
          label: "Guillemets Symbol Color                 ",
          description: "« »",
        },
        {
          label: "Guillemets Text Color                       ",
          description: "«content»",
        },
        {
          label: "Square Brackets Symbol Color       ",
          description: "[ ]",
        },
        {
          label: "Square Brackets Text Color             ",
          description: "[content]",
        },
        {
          label: "Parentheses Symbol Color              ",
          description: "( )",
        },
        {
          label: "Parentheses Text Color                    ",
          description: "(content)",
        },
        {
          label: "Curly Braces Symbol Color              ",
          description: "{ }",
        },
        {
          label: "Curly Braces Text Color                   ",
          description: "{content}",
        },
        {
          label: "Angle Brackets Symbol Color          ",
          description: "< >",
        },
        {
          label: "Angle Brackets Text Color               ",
          description: "<content>",
        },
        {
          label: "Bold Text Color                                ",
          description: "**content**",
        },
        {
          label: "Italic Text Color                                ",
          description: "*content*",
        },
        {
          label: "Code Text Color                              ",
          description: "`content`",
        },
        {
          label: "Strikethrough Text Color                ",
          description: "~~content~~",
        },

        { label: "", kind: vscode.QuickPickItemKind.Separator },

        {
          label: "Apply Preset Theme             ",
          description:
            "Default • Colorblind Friendly • Ocean Breeze • Forest Glow • Sunset Vibes • Royal Purple • Professional",
        },
        {
          label: "Reset All Colors                    ",
          description: "Restore defaults",
        },
      ];

      const selection = await vscode.window.showQuickPick(options, {
        placeHolder: "Choose what to customize",
      });

      if (!selection) {
        return; // User cancelled
      }

      const label = selection.label.trim();

      switch (label) {
        case "Guillemets Symbol Color":
          await customizeTokenColor("guillemets-symbol");
          break;
        case "Guillemets Text Color":
          await customizeTokenColor("guillemets-text");
          break;
        case "Square Brackets Symbol Color":
          await customizeTokenColor("brackets-symbol");
          break;
        case "Square Brackets Text Color":
          await customizeTokenColor("brackets-text");
          break;
        case "Parentheses Symbol Color":
          await customizeTokenColor("parentheses-symbol");
          break;
        case "Parentheses Text Color":
          await customizeTokenColor("parentheses-text");
          break;
        case "Curly Braces Symbol Color":
          await customizeTokenColor("braces-symbol");
          break;
        case "Curly Braces Text Color":
          await customizeTokenColor("braces-text");
          break;
        case "Angle Brackets Symbol Color":
          await customizeTokenColor("angle-symbol");
          break;
        case "Angle Brackets Text Color":
          await customizeTokenColor("angle-text");
          break;
        case "Bold Text Color":
          await customizeTokenColor("bold-text");
          break;
        case "Italic Text Color":
          await customizeTokenColor("italic-text");
          break;
        case "Code Text Color":
          await customizeTokenColor("code-text");
          break;
        case "Strikethrough Text Color":
          await customizeTokenColor("strikethrough-text");
          break;

        case "Apply Preset Theme":
          await showPresetThemes();
          break;
        case "Reset All Colors":
          await resetToDefaults();
          break;
        default:
          log(`Unknown selection: ${label}`);
          break;
      }
    }
  );

  context.subscriptions.push(customizeColors);
}

/**
 * Opens the color picker for a specific token type
 * @param tokenType - The token type to customize
 */
async function customizeTokenColor(tokenType: TokenType): Promise<void> {
  const selectedColor = await showTwoStepColorPicker(tokenType);

  if (selectedColor) {
    await updateTokenColor(tokenType, selectedColor.hex);
    vscode.window.showInformationMessage(
      `${tokenType} color updated to ${selectedColor.name}`
    );
  }
}

/**
 * Shows a two-step color picker (family, then shade)
 * @param tokenType - The token type being customized
 * @returns The selected color or undefined if cancelled
 */
async function showTwoStepColorPicker(
  tokenType: TokenType
): Promise<SelectedColor | undefined> {
  const colorFamilies = [
    {
      label: "🔴 Red",
      description: "Warm, energetic, attention-grabbing",
      family: "red",
    },
    {
      label: "🟠 Orange",
      description: "Vibrant, friendly, creative",
      family: "orange",
    },
    {
      label: "🟡 Amber",
      description: "Warm, optimistic, warning",
      family: "amber",
    },
    {
      label: "🟢 Green",
      description: "Natural, success, growth",
      family: "green",
    },
    {
      label: "🔵 Blue",
      description: "Cool, professional, trustworthy",
      family: "blue",
    },
    {
      label: "🟣 Purple",
      description: "Creative, luxury, mysterious",
      family: "purple",
    },
    {
      label: "🩷 Pink",
      description: "Playful, feminine, soft",
      family: "pink",
    },
    {
      label: "⚫ Slate",
      description: "Clean, minimal, professional",
      family: "slate",
    },
    {
      label: "⚪ Gray",
      description: "Neutral, balanced, subtle",
      family: "gray",
    },
  ];

  const selectedFamily = await vscode.window.showQuickPick(colorFamilies, {
    placeHolder: `Choose a color family for ${tokenType}`,
    title: "Step 1: Select Color Family",
  });

  if (!selectedFamily) {
    return;
  }

  const familyColors = colors[selectedFamily.family as keyof typeof colors];
  if (!Array.isArray(familyColors)) {
    return;
  }

  const filteredColors = (familyColors as ColorInfo[]).filter((color) =>
    COLOR_SCALES.includes(color.scale as ColorScale)
  );

  const shadeOptions = filteredColors.map((color) => {
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
    title: "Step 2: Select Color Shade",
  });

  return selectedShade
    ? { hex: selectedShade.hex, name: selectedShade.name }
    : undefined;
}

/**
 * Gets a human-readable intensity description for a color scale
 * @param scale - The color scale (300, 500, or 700)
 * @returns Intensity description
 */
function getIntensityDescription(scale: number): string {
  if (scale === 300) {
    return "Light";
  }
  if (scale === 500) {
    return "Medium";
  }
  if (scale === 700) {
    return "Dark";
  }
  return "Unknown";
}

/**
 * Gets a visual preview of the color intensity
 * @param _hex - The hex color (unused but kept for future use)
 * @param scale - The color scale
 * @returns Visual intensity indicator
 */
function getColorPreview(_hex: string, scale: number): string {
  if (scale === 300) {
    return "●●○○○";
  }
  if (scale === 500) {
    return "●●●●○";
  }
  if (scale === 700) {
    return "●●●●●";
  }
  return "●●●○○";
}

/**
 * Shows a picker with preset theme options and applies the selected theme
 */
async function showPresetThemes(): Promise<void> {
  const themes: Record<string, Theme> = {
    "Default (Recommended)": {
      "guillemets-symbol": getColorByScale(colors.blue, 500),
      "guillemets-text": getColorByScale(colors.blue, 300),
      "brackets-symbol": getColorByScale(colors.emerald, 500),
      "brackets-text": getColorByScale(colors.emerald, 300),
      "parentheses-symbol": getColorByScale(colors.amber, 500),
      "parentheses-text": getColorByScale(colors.amber, 300),
      "braces-symbol": getColorByScale(colors.rose, 500),
      "braces-text": getColorByScale(colors.rose, 300),
      "angle-symbol": getColorByScale(colors.purple, 500),
      "angle-text": getColorByScale(colors.purple, 300),
      "bold-text": getColorByScale(colors.orange, 500),
      "italic-text": getColorByScale(colors.purple, 500),
      "code-text": getColorByScale(colors.green, 500),
      "strikethrough-text": getColorByScale(colors.gray, 500),
    },
    "Colorblind Friendly": {
      "guillemets-symbol": getColorByScale(colors.blue, 700),
      "guillemets-text": getColorByScale(colors.blue, 500),
      "brackets-symbol": getColorByScale(colors.orange, 700),
      "brackets-text": getColorByScale(colors.orange, 500),
      "parentheses-symbol": getColorByScale(colors.purple, 700),
      "parentheses-text": getColorByScale(colors.purple, 500),
      "braces-symbol": getColorByScale(colors.cyan, 700),
      "braces-text": getColorByScale(colors.cyan, 500),
      "angle-symbol": getColorByScale(colors.amber, 700),
      "angle-text": getColorByScale(colors.amber, 500),
      "bold-text": getColorByScale(colors.blue, 700),
      "italic-text": getColorByScale(colors.purple, 700),
      "code-text": getColorByScale(colors.orange, 700),
      "strikethrough-text": getColorByScale(colors.slate, 600),
    },
    "Ocean Breeze": {
      "guillemets-symbol": getColorByScale(colors.blue, 500),
      "guillemets-text": getColorByScale(colors.blue, 300),
      "brackets-symbol": getColorByScale(colors.cyan, 400),
      "brackets-text": getColorByScale(colors.cyan, 200),
      "parentheses-symbol": getColorByScale(colors.teal, 500),
      "parentheses-text": getColorByScale(colors.teal, 300),
      "braces-symbol": getColorByScale(colors.sky, 600),
      "braces-text": getColorByScale(colors.sky, 400),
      "angle-symbol": getColorByScale(colors.indigo, 500),
      "angle-text": getColorByScale(colors.indigo, 300),
      "bold-text": getColorByScale(colors.violet, 500),
      "italic-text": getColorByScale(colors.purple, 500),
      "code-text": getColorByScale(colors.teal, 500),
      "strikethrough-text": getColorByScale(colors.slate, 500),
    },
    "Forest Glow": {
      "guillemets-symbol": getColorByScale(colors.emerald, 500),
      "guillemets-text": getColorByScale(colors.emerald, 300),
      "brackets-symbol": getColorByScale(colors.green, 400),
      "brackets-text": getColorByScale(colors.green, 200),
      "parentheses-symbol": getColorByScale(colors.lime, 500),
      "parentheses-text": getColorByScale(colors.lime, 300),
      "braces-symbol": getColorByScale(colors.teal, 600),
      "braces-text": getColorByScale(colors.teal, 400),
      "angle-symbol": getColorByScale(colors.cyan, 500),
      "angle-text": getColorByScale(colors.cyan, 300),
      "bold-text": getColorByScale(colors.emerald, 700),
      "italic-text": getColorByScale(colors.green, 500),
      "code-text": getColorByScale(colors.lime, 500),
      "strikethrough-text": getColorByScale(colors.slate, 500),
    },
    "Sunset Vibes": {
      "guillemets-symbol": getColorByScale(colors.orange, 500),
      "guillemets-text": getColorByScale(colors.orange, 300),
      "brackets-symbol": getColorByScale(colors.amber, 400),
      "brackets-text": getColorByScale(colors.amber, 200),
      "parentheses-symbol": getColorByScale(colors.yellow, 500),
      "parentheses-text": getColorByScale(colors.yellow, 300),
      "braces-symbol": getColorByScale(colors.red, 500),
      "braces-text": getColorByScale(colors.red, 300),
      "angle-symbol": getColorByScale(colors.pink, 500),
      "angle-text": getColorByScale(colors.pink, 300),
      "bold-text": getColorByScale(colors.red, 500),
      "italic-text": getColorByScale(colors.orange, 500),
      "code-text": getColorByScale(colors.yellow, 700),
      "strikethrough-text": getColorByScale(colors.gray, 500),
    },
    "Royal Purple": {
      "guillemets-symbol": getColorByScale(colors.purple, 500),
      "guillemets-text": getColorByScale(colors.purple, 300),
      "brackets-symbol": getColorByScale(colors.violet, 400),
      "brackets-text": getColorByScale(colors.violet, 200),
      "parentheses-symbol": getColorByScale(colors.fuchsia, 500),
      "parentheses-text": getColorByScale(colors.fuchsia, 300),
      "braces-symbol": getColorByScale(colors.pink, 600),
      "braces-text": getColorByScale(colors.pink, 400),
      "angle-symbol": getColorByScale(colors.indigo, 600),
      "angle-text": getColorByScale(colors.indigo, 400),
      "bold-text": getColorByScale(colors.purple, 500),
      "italic-text": getColorByScale(colors.violet, 500),
      "code-text": getColorByScale(colors.fuchsia, 500),
      "strikethrough-text": getColorByScale(colors.gray, 500),
    },
    Professional: {
      "guillemets-symbol": getColorByScale(colors.slate, 600),
      "guillemets-text": getColorByScale(colors.slate, 400),
      "brackets-symbol": getColorByScale(colors.gray, 500),
      "brackets-text": getColorByScale(colors.gray, 300),
      "parentheses-symbol": getColorByScale(colors.zinc, 600),
      "parentheses-text": getColorByScale(colors.zinc, 400),
      "braces-symbol": getColorByScale(colors.neutral, 700),
      "braces-text": getColorByScale(colors.neutral, 500),
      "angle-symbol": getColorByScale(colors.stone, 600),
      "angle-text": getColorByScale(colors.stone, 400),
      "bold-text": getColorByScale(colors.slate, 500),
      "italic-text": getColorByScale(colors.gray, 500),
      "code-text": getColorByScale(colors.zinc, 500),
      "strikethrough-text": getColorByScale(colors.neutral, 500),
    },
  };

  const themeOptions = Object.entries(themes).map(([name, colors]) => ({
    label: name,
    description: `${Object.keys(colors).length} colors`,
    detail: `Guillemets: ${Object.values(colors)[0]} • Brackets: ${Object.values(colors)[1]}`,
    theme: colors,
  }));

  const selection = await vscode.window.showQuickPick(themeOptions, {
    placeHolder: "Choose a preset theme",
  });

  if (selection) {
    await applyTheme(selection.theme);
    vscode.window.showInformationMessage(`Applied ${selection.label} theme`);
  }
}

/**
 * Updates the color for a specific token type in VSCode settings
 * @param tokenType - The type of token to update
 * @param color - Hex color string (e.g., '#ff0000')
 */
async function updateTokenColor(
  tokenType: TokenType,
  color: string
): Promise<void> {
  try {
    log(`Updating token color for ${tokenType} to ${color}`);
    const config = vscode.workspace.getConfiguration();
    const tokenColors =
      config.get<TokenColorCustomizations>("editor.tokenColorCustomizations") ||
      {};

    log(
      `Current tokenColors: ${JSON.stringify(tokenColors, null, 2).substring(0, 200)}...`
    );

    if (!tokenColors.textMateRules) {
      tokenColors.textMateRules = [];
    }

    const scope = SCOPE_MAP[tokenType];
    log(`Updating ${tokenType} (${scope}) to ${color}`);

    const existingRuleIndex = tokenColors.textMateRules.findIndex(
      (rule: TextMateRule) =>
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
      log(`Updating existing rule at index ${existingRuleIndex}`);
      tokenColors.textMateRules[existingRuleIndex] = newRule;
    } else {
      log("Adding new rule");
      tokenColors.textMateRules.push(newRule);
    }

    log("Configuration will be updated");

    await config.update(
      "editor.tokenColorCustomizations",
      tokenColors,
      vscode.ConfigurationTarget.Global
    );

    log("Configuration updated successfully");
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    log(`Error updating token color: ${errorMessage}`);
    vscode.window.showErrorMessage(`Failed to update color: ${errorMessage}`);
  }
}

/**
 * Applies a complete theme by updating all token colors
 * @param theme - Theme configuration with colors for all token types
 */
async function applyTheme(theme: Theme): Promise<void> {
  const config = vscode.workspace.getConfiguration();
  const originalFormatOnSave = config.get("editor.formatOnSave");

  try {
    // Disable formatOnSave to prevent race condition
    if (originalFormatOnSave) {
      await config.update(
        "editor.formatOnSave",
        false,
        vscode.ConfigurationTarget.Global
      );
    }

    // Apply all color changes sequentially
    for (const [tokenType, color] of Object.entries(theme)) {
      await updateTokenColor(tokenType as TokenType, color);
    }
  } finally {
    // Always restore formatOnSave, even if something fails
    if (originalFormatOnSave) {
      await config.update(
        "editor.formatOnSave",
        originalFormatOnSave,
        vscode.ConfigurationTarget.Global
      );
    }
  }
}

/**
 * Gets a color from a color array by its scale
 * @param colorArray - Array of colors with scale information
 * @param scale - The desired scale (e.g., 300, 500, 700)
 * @returns Hex color string or white as fallback
 */
function getColorByScale(colorArray: ColorInfo[], scale: number): string {
  const colorObj = colorArray.find((c) => c.scale === scale);
  return colorObj?.hex || "#FFFFFF";
}

/**
 * Resets all extension-managed colors to default by removing custom rules
 */
async function resetToDefaults(): Promise<void> {
  const config = vscode.workspace.getConfiguration();
  const tokenColors =
    config.get<TokenColorCustomizations>("editor.tokenColorCustomizations") ||
    {};

  if (tokenColors.textMateRules) {
    // Remove only rules for scopes managed by this extension
    tokenColors.textMateRules = tokenColors.textMateRules.filter(
      (rule: TextMateRule) =>
        !(
          EXTENSION_SCOPES.includes(rule.scope as string) ||
          (Array.isArray(rule.scope) &&
            rule.scope.some((s: string) => EXTENSION_SCOPES.includes(s)))
        )
    );

    await config.update(
      "editor.tokenColorCustomizations",
      tokenColors,
      vscode.ConfigurationTarget.Global
    );
    vscode.window.showInformationMessage("Reset to default colors");
  }
}

/**
 * Called when the extension is deactivated
 */
export function deactivate(): void {
  // Cleanup is handled by context.subscriptions
}
