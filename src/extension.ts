// biome-ignore lint/correctness/noUndeclaredDependencies: the extension host provides vscode at runtime.
import * as vscode from 'vscode';
import { registerColorCommands } from './color-picker';

export function activate(context: vscode.ExtensionContext) {
  try {
    console.log('Markdown Guillemets extension is now active!');
    console.log('Extension context:', context.extensionPath);

    registerColorCommands(context);
    console.log('Commands registered successfully');
  } catch (error) {
    console.error('Error activating Markdown Guillemets extension:', error);
    vscode.window.showErrorMessage(
      `Markdown Guillemets activation failed: ${error}`
    );
  }
}

export function deactivate() {}
