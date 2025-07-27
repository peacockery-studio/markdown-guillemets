# Change Log

All notable changes to the "markdown-guillemets" extension will be documented in this file.

## [Unreleased]

### Added
- **Colorblind-friendly preset theme** - High contrast color combinations that work for all types of color vision, avoiding problematic red/green combinations
- **Comprehensive documentation** - Modernized README with feature-first approach, extensive usage examples, and two-tier customization guide
- **Dedicated roadmap** - Extracted roadmap to separate ROADMAP.md file with organized priority levels
- **Enhanced troubleshooting** - Added specific instructions for resolving color conflicts using Default preset theme and window reload
- **Automatic color application** - Colors now apply instantly upon extension installation via `configurationDefaults`
- **Release workflow** - Automated GitHub Actions workflow for publishing to VS Code Marketplace with auto-versioning
- **Angle brackets support** - Syntax highlighting for angle brackets `<>`
- **Enhanced color customization** - Separate symbol and text color options for all bracket types
- **Preset themes** - Multiple built-in color themes (Default, Colorblind Friendly, Ocean Breeze, Forest Glow, Sunset Vibes, Royal Purple, Professional)
- **VS Code best practices documentation** - Comprehensive guide for optimal syntax highlighting implementation
- **Markdown formatting support** - Bold (`**text**`), italic (`*text*`), inline code (`` `text` ``), and strikethrough (`~~text~~`) now work inside all bracket types
- **Enhanced QuickPick UI** - Improved command interface with visual descriptions, aligned labels, and separator sections
- **Simplified color picker** - Reduced shade options to Light (300), Medium (500), and Dark (700) for faster selection

### Changed
- **Documentation restructure** - README now focuses on current features with comprehensive usage examples and streamlined customization guidance
- **Preset theme organization** - Colorblind Friendly theme added as second option after Default (Recommended)
- **Command Palette descriptions** - Updated to include all available preset themes
- **Roadmap organization** - Moved from README to dedicated file with completed features section
- **Simplified activation** - Removed manual welcome message and setup prompts for zero-friction experience
- **Improved command structure** - Enhanced color customization commands with better organization and visual hierarchy
- **Better theme compatibility** - Colors work seamlessly across light and dark themes
- **Performance optimizations** - Cleaner code with removed unused functions and variables
- **TextMate grammar enhancement** - All bracket patterns now include markdown formatting support via VS Code's built-in grammar
- **Color scope corrections** - Fixed inline code scope from `markup.inline.raw.string.markdown` to `markup.inline.raw.markdown`

### Removed
- **Release script** - Removed redundant `release.sh` in favor of automated GitHub Actions workflow
- **Outdated documentation** - Removed manual JSON configuration examples from main README flow
- **Roadmap from README** - Extracted to dedicated ROADMAP.md file for better organization
- Manual color setup prompts and welcome messages
- Unused functions (`applyRecommendedSettings`, `_getCurrentTokenColor`)
- Debug console output file
- "Quick Setup" command (redundant with automatic color application)
- Link formatting support (removed for simplicity)
- Bold symbol color customization (uses VS Code's built-in styling)
- Excessive color shade options (kept only 300, 500, 700)

### Fixed
- Lint errors and code formatting issues
- Pre-commit hook configuration
- Bold text pattern ending detection (switched to VS Code's built-in grammar)
- Extension command scope mappings for markdown formatting

## [0.0.1] - 2024-07-24

### Added
- Initial release
- Syntax highlighting for French guillemets `«»`
- Syntax highlighting for square brackets `[]`
- Syntax highlighting for parentheses `()`
- Syntax highlighting for curly braces `{}`
- Support for nested markdown formatting within brackets
