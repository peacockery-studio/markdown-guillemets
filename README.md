# Markdown French Guillemets

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
        "foreground": "#98C379"
      }
    },
    {
      "scope": "punctuation.definition.guillemets.begin.markdown, punctuation.definition.guillemets.end.markdown",
      "settings": {
        "foreground": "#E06C75",
        "fontStyle": "bold"
      }
    }
  ]
}
```

## Available Scopes

- `string.quoted.guillemets.markdown` - Text between guillemets
- `punctuation.definition.guillemets.begin.markdown` - Opening guillemet `«`
- `punctuation.definition.guillemets.end.markdown` - Closing guillemet `»`
- `string.quoted.square.markdown` - Text between square brackets
- `punctuation.definition.square.begin.markdown` - Opening bracket `[`
- `punctuation.definition.square.end.markdown` - Closing bracket `]`
- `string.quoted.round.markdown` - Text between parentheses
- `punctuation.definition.round.begin.markdown` - Opening parenthesis `(`
- `punctuation.definition.round.end.markdown` - Closing parenthesis `)`
- `string.quoted.curly.markdown` - Text between curly braces
- `punctuation.definition.curly.begin.markdown` - Opening brace `{`
- `punctuation.definition.curly.end.markdown` - Closing brace `}`

## Installation

1. Clone this repository
2. Open in VSCode
3. Press `F5` to test in Extension Development Host
4. Package with `vsce package` for local installation

## License

MIT