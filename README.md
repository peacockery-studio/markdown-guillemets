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

Each bracket type gets its own scope, allowing you to customize colors independently through your theme or settings.

## Customization

You can customize the colors by adding these rules to your VSCode settings:

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
    }
  ]
}
```

## Available Scopes

- `string.quoted.guillemets.markdown` - Text between guillemets
- `punctuation.definition.guillemets.markdown` - The guillemets themselves `«»`
- `string.quoted.square.markdown` - Text between square brackets
- `punctuation.definition.square.markdown` - The square brackets themselves `[]`
- `string.quoted.round.markdown` - Text between parentheses
- `punctuation.definition.round.markdown` - The parentheses themselves `()`
- `string.quoted.curly.markdown` - Text between curly braces
- `punctuation.definition.curly.markdown` - The curly braces themselves `{}`

## Installation

### From Marketplace (Coming Soon)

Search for "Markdown French Guillemets" in the VS Code Extensions view.

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

- [x] French guillemets «» syntax highlighting
- [x] Square brackets [] syntax highlighting  
- [x] Parentheses () syntax highlighting
- [x] Curly braces {} syntax highlighting
- [x] Customizable colors via VSCode settings
- [x] Support for nested Markdown formatting

### Planned Features

#### Simple Additions

- [ ] Single quotes 'text' and double quotes "text" highlighting
- [ ] Backticks `text` highlighting
- [ ] Angle brackets <text> for HTML/XML-like syntax
- [ ] International quote styles (German „quotes", Spanish ¿questions?, Japanese 「brackets」)

#### Advanced Features

- [ ] Smart bracket matching - highlight pairs when cursor is on bracket
- [ ] Folding support - collapse content between brackets
- [ ] Snippets - type `guil` → auto-insert `«|»` with cursor positioned
- [ ] Commands - convert/wrap selected text with different bracket types
- [ ] Multi-language support - extend beyond Markdown to other file types

#### Configuration Options

- [ ] Toggle highlighting on/off per bracket type
- [ ] User-defined custom bracket pairs
- [ ] Alternative highlighting styles (underline, background color, etc.)
- [ ] Nested bracket highlighting with different colors for depth levels

## License

MIT
