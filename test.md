# Comprehensive Test File for Markdown Bracket Highlighting

## Table of Contents

1. [Basic Single-line Examples](#basic-single-line-examples)
2. [Multi-line Examples](#multi-line-examples)
3. [Nested Brackets](#nested-brackets)
4. [Markdown Formatting Inside Brackets](#markdown-formatting-inside-brackets)
5. [Edge Cases](#edge-cases)
6. [Real-world Examples](#real-world-examples)

- --

## Basic Single-line Examples

### French Guillemets

«This text should be green» with «bold red guillemets»

### Square Brackets

[This text should be blue] with [bold purple brackets]

### Parentheses

(This text should be orange) with (bold cyan parentheses)

### Curly Braces

{This text should be yellow} with {bold red-orange curly braces}

### Angle Brackets

<This text should be magenta> with <bold dark magenta brackets>

- --

## Multi-line Examples

### Multi-line Guillemets

«Was von Menschen nicht gewußt,
Oder nicht bedacht,
Durch das Labyrinth der Brust
Wandelt in der Nacht.»

### Multi-line Square Brackets

[This is a multi-line
square bracket example that
spans three lines]

### Multi-line Parentheses

(This parenthetical statement
extends across multiple lines
to test highlighting persistence)

### Multi-line Curly Braces

{A curly brace block
that contains multiple lines
should maintain consistent coloring}

### Multi-line Angle Brackets

<This angle bracket content
extends across several lines
maintaining the same magenta style>

- --

## Nested Brackets

### Simple Nesting

«French quote with [square brackets] inside»
[Square with (parentheses) inside]
(Round with {curly} inside)
{Curly with «guillemets» inside}
<Angle with 'single' inside>

### Deep Nesting

«Level 1 [Level 2 (Level 3 {Level 4} Level 3) Level 2] Level 1»

### Mixed Nesting

[Start with square «then guillemets (and parentheses {with curly}) back» to square]

- --

## Markdown Formatting Inside Brackets

### Bold

«This is **bold** text in guillemets»
[This is **bold** text in square brackets]
(This is **bold** text in parentheses)
{This is **bold** text in curly braces}
<This is **bold** text in angle brackets>

### Italic

«This is *italic* text in guillemets»
[This is *italic* text in square brackets]
(This is *italic* text in parentheses)
{This is *italic* text in curly braces}
<This is *italic* text in angle brackets>

### Code

«This is `code` in guillemets»
[This is `code` in square brackets]
(This is `code` in parentheses)
{This is `code` in curly braces}
<This is `code` in angle brackets>

### Strikethrough

«This is ~~strikethrough~~ in guillemets»
[This is ~~strikethrough~~ in square brackets]
(This is ~~strikethrough~~ in parentheses)
{This is ~~strikethrough~~ in curly braces}
<This is ~~strikethrough~~ in angle brackets>

### Links

«This is [a link](https://example.com) in guillemets»
[This is [a link](https://example.com) in square brackets]
(This is [a link](https://example.com) in parentheses)
{This is [a link](https://example.com) in curly braces}

<This is [a link](https://example.com) in angle brackets>

- --

## Edge Cases

### Empty Brackets

«» [] () {} <>

### Single Characters

«a» [b] (c) {d} <g>

### Numbers and Symbols

«123» [456] (789) {0} <&*()>

### Unicode

«こんにちは» [世界] (🌍) {🎉} <✨>

### Adjacent Brackets

«»«» [][] ()() {}{} <><>

- --

## Real-world Examples

### French Literature Quote

«Il n'y a qu'un héroïsme au monde : c'est de voir le monde tel qu'il est, et de l'aimer.» — Romain Rolland

### Code Documentation

[TODO: Implement user authentication] (See issue #42)

### Mathematical Expression

{x | x ∈ ℝ, x² + y² = r²}

### HTML/XML Reference

<div class="container"> represents a generic container element

### File Paths

«/usr/local/bin/node» [C:\Program Files\VSCode] (/home/user/documents)

### Configuration Examples

{
  "editor.fontSize": 14,
  "theme": "dark"
}

### Multi-line Poetry with Mixed Brackets

«Dans le vieux parc [solitaire et glacé],
Deux formes (ont tout à l'heure) passé.

Leurs yeux sont morts et leurs lèvres sont molles,
Et l'on entend à peine {leurs paroles}.»

- --

## Testing Notes

All bracket types should:
1. ✓ Highlight with distinct colors for text and symbols
2. ✓ Support multi-line content
3. ✓ Allow nesting of other bracket types
4. ✓ Preserve internal Markdown formatting
5. ✓ Handle edge cases gracefully
6. ✗ Multi-line highlighting may not work due to VSCode limitations

### Color Reference (Default Theme)

- «Guillemets»: Green text, bold red symbols
- [Square]: Blue text, bold purple symbols
- (Parentheses): Orange text, bold cyan symbols
- {Curly}: Yellow text, bold red-orange symbols
- <Angle>: Magenta text, bold dark magenta symbols
