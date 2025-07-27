# Roadmap

## Recently Completed ✅

### Colorblind-Friendly Preset Theme
- ✅ High contrast color combinations that work for all types of color vision
- ✅ Avoid problematic red/green combinations  
- ✅ Use distinct hues: blue, orange, purple, cyan, amber
- ✅ Available as "Colorblind Friendly" preset theme in Command Palette

## High Priority Features

### International Quote Styles
- German „quotes" highlighting (U+201E, U+201C)
- Spanish ¿questions? highlighting (U+00BF, U+003F)  
- Japanese 「brackets」 highlighting (U+300C, U+300D)
- Support for additional international punctuation patterns

### Snippets
- Type `guil` + Tab → `«|»` with cursor positioned between
- Type `sq` + Tab → `[|]`
- Type `paren` + Tab → `(|)`
- Type `curly` + Tab → `{|}`
- Type `angle` + Tab → `⟨|⟩`

### Toggle Highlighting On/Off
- Per-bracket-type enable/disable in settings
- Command palette options for quick toggling
- Workspace-specific configuration support

## Medium Priority Features

### Smart Bracket Matching
- Highlight matching bracket pairs when cursor is positioned on opening/closing bracket
- Similar to VS Code's built-in parentheses matching for code
- Visual indication of bracket relationships

### Additional Bracket Pairs
- **Mathematical**: Floor `⌊⌋`, Ceiling `⌈⌉`, Angle `⟨⟩`
- **Lenticular**: `【】` (East Asian emphasis brackets)
- **Double brackets**: `⟦⟧` (semantic evaluation)
- **Ornamental**: `❨❩`, `❪❫`, `❬❭`, `❰❱`
- **Corner brackets**: `「」`, `『』` (Japanese quotation)
- **Tortoise shell**: `〔〕`, `〖〗`, `〘〙`

### Sidebar Interface
- Visual color picker with live preview
- Drag-and-drop color customization
- Export/import configuration profiles
- Advanced formatting options
- Real-time markdown preview with bracket highlighting

## Low Priority Features

### Performance Optimizations
- Lazy loading for very large files (>10MB)
- Debounced highlighting updates during rapid typing
- Selective re-parsing on document edits
- Memory usage optimization for documents with many brackets

---

*Features are listed in approximate order of implementation priority. This roadmap is subject to change based on user feedback and development resources.*
