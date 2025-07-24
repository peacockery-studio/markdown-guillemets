#!/bin/bash

# Release script for markdown-guillemets VSCode extension
# Usage: ./release.sh [patch|minor|major]

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if version type is provided
if [ -z "$1" ]; then
    echo -e "${RED}Error: Please specify version type (patch, minor, or major)${NC}"
    echo "Usage: ./release.sh [patch|minor|major]"
    exit 1
fi

VERSION_TYPE=$1

# Validate version type
if [[ ! "$VERSION_TYPE" =~ ^(patch|minor|major)$ ]]; then
    echo -e "${RED}Error: Invalid version type. Use patch, minor, or major${NC}"
    exit 1
fi

# Check for uncommitted changes
if ! git diff-index --quiet HEAD --; then
    echo -e "${RED}Error: You have uncommitted changes. Please commit or stash them first.${NC}"
    exit 1
fi

# Get current version from package.json
CURRENT_VERSION=$(grep -o '"version": "[^"]*"' package.json | cut -d'"' -f4)
echo -e "${YELLOW}Current version: $CURRENT_VERSION${NC}"

# Calculate new version
IFS='.' read -ra VERSION_PARTS <<< "$CURRENT_VERSION"
MAJOR=${VERSION_PARTS[0]}
MINOR=${VERSION_PARTS[1]}
PATCH=${VERSION_PARTS[2]}

case $VERSION_TYPE in
    patch)
        PATCH=$((PATCH + 1))
        ;;
    minor)
        MINOR=$((MINOR + 1))
        PATCH=0
        ;;
    major)
        MAJOR=$((MAJOR + 1))
        MINOR=0
        PATCH=0
        ;;
esac

NEW_VERSION="$MAJOR.$MINOR.$PATCH"
echo -e "${GREEN}New version: $NEW_VERSION${NC}"

# Update package.json
sed -i '' "s/\"version\": \"$CURRENT_VERSION\"/\"version\": \"$NEW_VERSION\"/" package.json

# Update CHANGELOG.md
TODAY=$(date +%Y-%m-%d)
CHANGELOG_ENTRY="## [$NEW_VERSION] - $TODAY\n\n### Added\n- \n\n### Changed\n- \n\n### Fixed\n- \n\n"

# Insert new changelog entry after the header
sed -i '' "/# Change Log/a\\
\\
$CHANGELOG_ENTRY" CHANGELOG.md

echo -e "${YELLOW}Please update CHANGELOG.md with your changes${NC}"
echo -e "${YELLOW}Opening CHANGELOG.md...${NC}"

# Open CHANGELOG for editing (works on macOS)
if command -v code &> /dev/null; then
    code CHANGELOG.md
else
    open CHANGELOG.md
fi

echo ""
echo -e "${YELLOW}After updating CHANGELOG.md, press Enter to continue...${NC}"
read -r

# Commit version bump
git add package.json CHANGELOG.md
git commit -m "Release v$NEW_VERSION"

# Create tag
git tag "v$NEW_VERSION"

# Package extension
echo -e "${GREEN}Packaging extension...${NC}"
vsce package

# Push to GitHub
echo -e "${GREEN}Pushing to GitHub...${NC}"
git push
git push --tags

# Create GitHub release
echo -e "${GREEN}Creating GitHub release...${NC}"
gh release create "v$NEW_VERSION" \
    --title "v$NEW_VERSION" \
    --notes "See [CHANGELOG.md](https://github.com/peacockery-studio/markdown-guillemets/blob/main/CHANGELOG.md#$(echo $NEW_VERSION | tr . -)---$TODAY) for details" \
    "markdown-guillemets-$NEW_VERSION.vsix"

# Publish to marketplace
echo ""
echo -e "${YELLOW}Ready to publish to VS Code Marketplace?${NC}"
echo -e "${YELLOW}Run: vsce publish${NC}"
echo -e "${YELLOW}Or upload the .vsix file manually at https://marketplace.visualstudio.com/manage${NC}"

echo ""
echo -e "${GREEN}✓ Release v$NEW_VERSION completed!${NC}"
echo -e "${GREEN}✓ GitHub release: https://github.com/peacockery-studio/markdown-guillemets/releases/tag/v$NEW_VERSION${NC}"