# Contributing to Markdown French Guillemets

## How to Contribute

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Development Setup

1. Clone the repository
2. Open in VSCode
3. Press `F5` to launch Extension Development Host
4. Make changes and test them in the new window

## Building and Packaging

To create a `.vsix` package for distribution:

1. Install vsce (VS Code Extension manager):

   ```bash
   npm install -g @vscode/vsce
   # or with bun
   bun install -g @vscode/vsce
   ```

2. Package the extension:

   ```bash
   vsce package
   ```

This creates a `.vsix` file (e.g., `markdown-guillemets-0.0.1.vsix`) that can be:

- Shared for local installation
- Uploaded to the VS Code Marketplace
- Added as a GitHub release asset

## Submitting Issues

Please include:

- VSCode version
- Extension version
- Steps to reproduce
- Expected vs actual behavior
