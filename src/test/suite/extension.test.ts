import * as assert from "node:assert/strict";
import * as vscode from "vscode";
import type { TokenColorCustomizations } from "../../types";
import { SCOPE_MAP } from "../../types";

suite("Extension Test Suite", () => {
  vscode.window.showInformationMessage("Start all tests.");

  test("Extension should be present", () => {
    const extension = vscode.extensions.getExtension(
      "PeacockeryStudio.markdown-guillemets"
    );
    assert.ok(extension, "Extension should be installed");
  });

  test("Extension should activate", async () => {
    const extension = vscode.extensions.getExtension(
      "PeacockeryStudio.markdown-guillemets"
    );
    assert.ok(extension, "Extension should be installed");

    if (!extension.isActive) {
      await extension.activate();
    }

    assert.ok(extension.isActive, "Extension should be active");
  });

  test("Commands should be registered", async () => {
    const commands = await vscode.commands.getCommands(true);

    assert.ok(
      commands.includes("markdown-guillemets.customizeColors"),
      "customizeColors command should be registered"
    );
  });

  test("Extension contributes grammar", () => {
    const extension = vscode.extensions.getExtension(
      "PeacockeryStudio.markdown-guillemets"
    );
    assert.ok(extension, "Extension should be installed");

    const packageJSON = extension.packageJSON;
    assert.ok(
      packageJSON.contributes.grammars,
      "Extension should contribute grammars"
    );

    const grammars = packageJSON.contributes.grammars;
    assert.strictEqual(
      grammars.length,
      1,
      "Extension should contribute exactly one grammar"
    );
    assert.strictEqual(
      grammars[0].scopeName,
      "markdown.guillemets",
      "Grammar scope should be markdown.guillemets"
    );
  });

  test("SCOPE_MAP has all required scopes", () => {
    // Test that SCOPE_MAP contains expected token types
    const requiredTokens: Array<keyof typeof SCOPE_MAP> = [
      "guillemets-symbol",
      "guillemets-text",
      "brackets-symbol",
      "brackets-text",
      "parentheses-symbol",
      "parentheses-text",
      "braces-symbol",
      "braces-text",
      "angle-symbol",
      "angle-text",
      "bold-text",
      "italic-text",
      "code-text",
      "strikethrough-text",
    ];

    for (const token of requiredTokens) {
      assert.ok(SCOPE_MAP[token], `SCOPE_MAP should have mapping for ${token}`);
      assert.ok(
        SCOPE_MAP[token].includes("markdown"),
        `Scope for ${token} should be markdown-specific`
      );
    }
  });

  test("Configuration defaults are present", () => {
    const extension = vscode.extensions.getExtension(
      "PeacockeryStudio.markdown-guillemets"
    );
    assert.ok(extension, "Extension should be installed");

    const packageJSON = extension.packageJSON;
    assert.ok(
      packageJSON.contributes.configurationDefaults,
      "Extension should have configuration defaults"
    );

    const defaults = packageJSON.contributes.configurationDefaults;
    assert.ok(
      defaults["editor.tokenColorCustomizations"],
      "Should have tokenColorCustomizations defaults"
    );
  });

  test("Can read workspace configuration", () => {
    const config = vscode.workspace.getConfiguration();
    const tokenColors = config.get<TokenColorCustomizations>(
      "editor.tokenColorCustomizations"
    );

    // Should not throw and should return an object or undefined
    assert.ok(
      tokenColors === undefined || typeof tokenColors === "object",
      "Token colors configuration should be accessible"
    );
  });

  test("Extension package.json has required fields", () => {
    const extension = vscode.extensions.getExtension(
      "PeacockeryStudio.markdown-guillemets"
    );
    assert.ok(extension, "Extension should be installed");

    const packageJSON = extension.packageJSON;

    // Test required fields
    assert.ok(packageJSON.name, "Should have name");
    assert.ok(packageJSON.displayName, "Should have displayName");
    assert.ok(packageJSON.description, "Should have description");
    assert.ok(packageJSON.version, "Should have version");
    assert.ok(packageJSON.publisher, "Should have publisher");
    assert.ok(packageJSON.license, "Should have license");

    // Test activation events
    assert.ok(packageJSON.activationEvents, "Should have activation events");
    assert.ok(
      packageJSON.activationEvents.includes("onLanguage:markdown"),
      "Should activate on markdown language"
    );
  });
});
