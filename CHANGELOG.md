# Change Log

All notable changes to the "markdown-guillemets" extension will be documented in this file.

## [Unreleased]

### Added
- **Automatic color application** - Colors now apply instantly upon extension installation via `configurationDefaults`
- **Release workflow** - Automated GitHub Actions workflow for publishing to VS Code Marketplace with auto-versioning
- **Angle brackets support** - Syntax highlighting for angle brackets `<>`
- **Enhanced color customization** - Separate symbol and text color options for all bracket types
- **Preset themes** - Multiple built-in color themes (Ocean Breeze, Forest Glow, Sunset Vibes, Royal Purple, Professional)
- **VS Code best practices documentation** - Comprehensive guide for optimal syntax highlighting implementation

### Changed
- **Simplified activation** - Removed manual welcome message and setup prompts for zero-friction experience
- **Improved command structure** - Enhanced color customization commands with better organization
- **Better theme compatibility** - Colors work seamlessly across light and dark themes
- **Performance optimizations** - Cleaner code with removed unused functions and variables

### Removed
- Manual color setup prompts and welcome messages
- Unused functions (`applyRecommendedSettings`, `_getCurrentTokenColor`)
- Debug console output file

### Fixed
- Lint errors and code formatting issues
- Pre-commit hook configuration

## [0.0.1] - 2024-07-24

### Added
- Initial release
- Syntax highlighting for French guillemets `«»`
- Syntax highlighting for square brackets `[]`
- Syntax highlighting for parentheses `()`
- Syntax highlighting for curly braces `{}`
- Support for nested markdown formatting within brackets
