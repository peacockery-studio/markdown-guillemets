# Markdown French Guillemets

[![CI](https://github.com/peacockery-studio/markdown-guillemets/actions/workflows/ci.yml/badge.svg)](https://github.com/peacockery-studio/markdown-guillemets/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A VSCode extension that adds syntax highlighting for French guillemets and common bracket pairs in Markdown files, with support for markdown formatting inside brackets.

## Features

### Bracket Highlighting
This extension provides distinct syntax highlighting for:

- **French guillemets**: `«text»`
- **Square brackets**: `[text]`
- **Parentheses**: `(text)`
- **Curly braces**: `{text}`
- **Angle brackets**: `<text>`

Each bracket type gets its own scope, allowing you to customize colors independently.

### Markdown Formatting Support
All bracket types support markdown formatting inside them:

- **Bold text**: `«**bold text**»`, `[**bold text**]`, `(**bold text**)`
- **Italic text**: `«*italic text*»`, `[*italic text*]`, `(*italic text*)`
- **Inline code**: `«`code`»`, `[`code`]`, `(`code`)`
- **Strikethrough**: `«~~strikethrough~~»`, `[~~strikethrough~~]`, `(~~strikethrough~~)`

### Easy Customization
**Interactive Color Picker** - No manual JSON editing required! Access via Command Palette (`Cmd+Shift+P` / `Ctrl+Shift+P`) → "Markdown Guillemets: Customize Colors"

### Automatic Setup
Colors work out-of-the-box with sensible defaults. No configuration needed for basic usage.

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

## Usage Examples

### Basic Bracket Highlighting
```markdown
French quotes: «Bonjour le monde»
Square brackets: [Important note]
Parentheses: (Additional context)
Curly braces: {Configuration option}
Angle brackets: <Required field>
```

### Markdown Formatting Inside Brackets
```markdown
Bold emphasis: «**This is bold**» and [**also bold**]
Italic text: «*This is italic*» and (*also italic*)
Inline code: «`console.log()`» and {`npm install`}
Strikethrough: «~~deprecated~~» and <~~old method~~>
```

### Mixed Content
```markdown
Complex example: «**Bold** and *italic* with `code` and ~~strikethrough~~»
Nested formatting: [**Bold** text with (*italic parentheses*) inside]
Technical docs: {`config.json`} contains «**important**» settings
```

### Real-world Examples
```markdown
Documentation: [**API Reference**] - see «*Getting Started*» guide
Code comments: // TODO: {**refactor this**} - (*performance issue*)
Notes: «Remember to run `npm test` before ~~deployment~~ **release**»
```

## Customization

### Quick Customization (Recommended)

Use the built-in color picker for easy customization:

1. **Command Palette** (`Cmd+Shift+P` / `Ctrl+Shift+P`)
2. Type: `Markdown Guillemets: Customize Colors`
3. Choose what to customize:
   - **Individual punctuation colors** (guillemets, brackets, parentheses, braces, angles)
   - **Preset themes** (Ocean Breeze, Forest Glow, Sunset Vibes, Royal Purple, Professional)
   - **Reset to defaults**

#### Two-Step Color Selection
When customizing individual colors:

**Step 1:** Choose color family (Red, Blue, Green, Purple, Yellow, Pink, Cyan, Orange)  
**Step 2:** Choose intensity (300 - Light, 500 - Medium, 700 - Dark)

Changes apply instantly - no restart needed!

#### Available Preset Themes
- **Default**: Original extension colors (recommended)
- **Colorblind Friendly**: High contrast colors that work for all types of color vision
- **Ocean Breeze**: Cool blues and teals
- **Forest Glow**: Natural greens and earth tones  
- **Sunset Vibes**: Warm oranges and reds
- **Royal Purple**: Rich purples and magentas
- **Professional**: Subtle, business-appropriate colors

### Advanced Configuration

For fine-grained control, you can manually edit VS Code settings:

1. **Command Palette** (`Cmd+Shift+P` / `Ctrl+Shift+P`)
2. Type: `Preferences: Open Settings (JSON)`
3. Add custom token color rules

#### Default Color Scheme
- **Guillemets «»**: Green text (#22c55e) with bold symbols (#dc2626)
- **Square brackets []**: Blue text (#3b82f6) with bold symbols (#a855f7)
- **Parentheses ()**: Orange text (#f97316) with bold symbols (#06b6d4)
- **Curly braces {}**: Yellow text (#eab308) with bold symbols (#dc2626)
- **Angle brackets <>**: Pink text (#ec4899) with bold symbols (#9333ea)

#### Manual Configuration Example
```json
"editor.tokenColorCustomizations": {
  "textMateRules": [
    {
      "scope": "string.quoted.guillemets.markdown",
      "settings": {
        "foreground": "#22c55e"  // Green text inside «guillemets»
      }
    },
    {
      "scope": "punctuation.definition.guillemets.markdown",
      "settings": {
        "foreground": "#dc2626",  // Red color for the actual « and » symbols
        "fontStyle": "bold"
      }
    }
    // ... additional rules for other bracket types
  ]
}
```

#### Available Scopes
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

#### Troubleshooting
- **Colors not showing**: Ensure you're editing a `.md` file and the extension is enabled
- **Custom colors not applying**: Check that your JSON syntax is valid in settings
- **Conflicts with themes or existing customizations**:
  1. `Cmd+Shift+P` → "Markdown Guillemets: Customize Colors"
  2. Choose "Preset themes" → "Default" (this will override existing settings)
  3. `Cmd+Shift+P` → "Developer: Reload Window" to refresh
- **Performance issues**: For very large files, consider disabling the extension temporarily

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for development setup and contribution guidelines.

## Roadmap

See [ROADMAP.md](ROADMAP.md) for planned features and long-term vision.

## License

MIT
