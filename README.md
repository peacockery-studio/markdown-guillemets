# Markdown French Guillemets

[![CI](https://github.com/peacockery-studio/markdown-guillemets/actions/workflows/ci.yml/badge.svg)](https://github.com/peacockery-studio/markdown-guillemets/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A VSCode extension that adds syntax highlighting for French guillemets and common bracket pairs in Markdown files.

## Features

This extension provides distinct syntax highlighting for:

- **French guillemets**: `«text»`
- **Square brackets**: `[text]`
- **Parentheses**: `(text)`
- **Curly braces**: `{text}`
- **Angle brackets**: `<text>`

Each bracket type gets its own scope, allowing you to customize colors independently through your theme or settings.

## Customization

### Interactive Color Picker (New!)

No more manual JSON editing! Use the built-in color picker:

1. **Command Palette** (`Cmd+Shift+P` / `Ctrl+Shift+P`)
2. Type: `Markdown Guillemets: Customize Colors`
3. Choose what to customize:
   - Individual punctuation colors (guillemets, brackets, parentheses, braces)
   - Preset themes (Ocean Breeze, Forest Glow, Sunset Vibes, etc.)
   - Reset to defaults

#### Two-Step Color Selection
When customizing individual colors, you'll get a user-friendly picker:

**Step 1:** Choose color family (Red, Blue, Green, Purple, etc.)  
**Step 2:** Choose intensity (Light 50-300, Medium 400-600, Dark 700-950)

Changes apply instantly - no restart needed!

### Manual Configuration

Advanced users can still customize colors by adding these rules to your VSCode settings.

### Default Color Scheme

- **Guillemets «»**: Green text (#98C379) with bold red symbols (#E06C75)
- **Square brackets []**: Blue text (#61AFEF) with bold purple symbols (#C678DD)
- **Parentheses ()**: Orange text (#D19A66) with bold cyan symbols (#56B6C2)
- **Curly braces {}**: Yellow text (#E5C07B) with bold red-orange symbols (#BE5046)
- **Angle brackets <>**: Magenta text (#FF79C6) with bold dark magenta symbols (#BD5FA6)

```json
"editor.tokenColorCustomizations": {
  "textMateRules": [
    {
      "scope": "string.quoted.guillemets.markdown",
      "settings": {
        "foreground": "#98C379"  // Green text inside «guillemets»
      }
    },
    {
      "scope": "punctuation.definition.guillemets.markdown",
      "settings": {
        "foreground": "#E06C75",  // Red color for the actual « and » symbols
        "fontStyle": "bold"
      }
    },
    {
      "scope": "string.quoted.square.markdown",
      "settings": {
        "foreground": "#61AFEF"  // Blue text inside [square brackets]
      }
    },
    {
      "scope": "punctuation.definition.square.markdown",
      "settings": {
        "foreground": "#C678DD",  // Purple color for the actual [ and ] symbols
        "fontStyle": "bold"
      }
    },
    {
      "scope": "string.quoted.round.markdown",
      "settings": {
        "foreground": "#D19A66"  // Orange text inside (parentheses)
      }
    },
    {
      "scope": "punctuation.definition.round.markdown",
      "settings": {
        "foreground": "#56B6C2",  // Cyan color for the actual ( and ) symbols
        "fontStyle": "bold"
      }
    },
    {
      "scope": "string.quoted.curly.markdown",
      "settings": {
        "foreground": "#E5C07B"  // Yellow text inside {curly braces}
      }
    },
    {
      "scope": "punctuation.definition.curly.markdown",
      "settings": {
        "foreground": "#BE5046",  // Red-orange color for the actual { and } symbols
        "fontStyle": "bold"
      }
    },

    {
      "scope": "string.quoted.angle.markdown",
      "settings": {
        "foreground": "#FF79C6"  // Magenta text inside <angle brackets>
      }
    },
    {
      "scope": "punctuation.definition.angle.markdown",
      "settings": {
        "foreground": "#BD5FA6",  // Dark magenta color for the actual < and > symbols
        "fontStyle": "bold"
      }
    }
  ]
}
```

## Available Scopes

- `string.quoted.guillemets.markdown` - Text between guillemets `«like this»`
- `punctuation.definition.guillemets.markdown` - The guillemets themselves `«»`
- `string.quoted.square.markdown` - Text between square brackets `[like this]`
- `punctuation.definition.square.markdown` - The square brackets themselves `[]`
- `string.quoted.round.markdown` - Text between parentheses `(like this)`
- `punctuation.definition.round.markdown` - The parentheses themselves `()`
- `string.quoted.curly.markdown` - Text between curly braces `{like this}`
- `punctuation.definition.curly.markdown` - The curly braces themselves `{}`
- `string.quoted.angle.markdown` - Text between angle brackets `<like this>`
- `punctuation.definition.angle.markdown` - The angle brackets themselves `<>`

## Installation

### From Marketplace

[Install from VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=PeacockeryStudio.markdown-guillemets) or search for "Markdown French Guillemets" in the VS Code Extensions view.

### From VSIX (Local Install)

1. Download the `.vsix` file from [Releases](https://github.com/peacockery-studio/markdown-guillemets/releases)
2. In VS Code: `Extensions: Install from VSIX...` command
3. Select the downloaded `.vsix` file

### From Source

1. Clone this repository
2. Run `vsce package` (requires `npm install -g @vscode/vsce`)
3. Install the generated `.vsix` file as above

## Roadmap

### Completed

- [x] French guillemets «» syntax highlighting (July 25, 2025)
- [x] Square brackets [] syntax highlighting (July 25, 2025)
- [x] Parentheses () syntax highlighting (July 25, 2025)
- [x] Curly braces {} syntax highlighting (July 25, 2025)
- [x] Angle brackets <> syntax highlighting (July 25, 2025)
- [x] Customizable colors via VSCode settings (July 25, 2025)
- [x] Support for nested Markdown formatting (July 25, 2025)

### Recently Added

- [x] Interactive color picker - no more JSON editing! (July 26, 2025)
- [x] Two-step color selection with visual previews (July 26, 2025)  
- [x] Preset themes with professional color combinations (July 26, 2025)
- [x] Quick setup command for instant configuration (July 26, 2025)

### Planned Features

#### Simple Additions

- [ ] International quote styles (German „quotes", Spanish ¿questions?, Japanese 「brackets」)

#### Advanced Features

- [ ] Smart bracket matching - highlight pairs when cursor is on bracket
- [ ] Folding support - collapse content between brackets
- [ ] Snippets - type `guil` → auto-insert `«|»` with cursor positioned
- [ ] Commands - convert/wrap selected text with different bracket types
- [ ] Multi-language support - extend beyond Markdown to other file types

#### Configuration Options

- [x] Interactive color customization with visual picker
- [x] Preset theme selection  
- [ ] Toggle highlighting on/off per bracket type
- [ ] User-defined custom bracket pairs
- [ ] Alternative highlighting styles (underline, background color, etc.)
- [ ] Nested bracket highlighting with different colors for depth levels

## Releasing

This project includes a release script to automate version bumping and publishing:

```bash
./release.sh patch   # Bug fixes: 0.0.1 → 0.0.2
./release.sh minor   # New features: 0.0.2 → 0.1.0  
./release.sh major   # Breaking changes: 0.1.0 → 1.0.0
```

The script will:
1. Bump version in package.json
2. Update CHANGELOG.md
3. Commit and tag the release
4. Build the .vsix package
5. Create a GitHub release
6. Provide instructions for publishing to VS Code Marketplace

## License

MIT
