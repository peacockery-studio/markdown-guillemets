import * as fs from 'node:fs';
import * as path from 'node:path';
import * as oniguruma from 'vscode-oniguruma';
import * as textmate from 'vscode-textmate';

declare const suite: Mocha.SuiteFunction;
declare const suiteSetup: Mocha.HookFunction;
declare const test: Mocha.TestFunction;

const root = path.resolve(__dirname, '../..');

const grammarPaths = new Map([
  ['text.html.markdown', 'node_modules/tm-grammars/grammars/markdown.json'],
  ['text.html.basic', 'node_modules/tm-grammars/grammars/html.json'],
  [
    'text.html.derivative',
    'node_modules/tm-grammars/grammars/html-derivative.json',
  ],
  ['source.js', 'node_modules/tm-grammars/grammars/javascript.json'],
  ['markdown.guillemets', 'syntaxes/markdown-guillemets.tmLanguage.json'],
]);

const extensionScopes = [
  'punctuation.definition.guillemets.markdown',
  'string.quoted.guillemets.markdown',
  'punctuation.definition.square.markdown',
  'string.quoted.square.markdown',
  'punctuation.definition.round.markdown',
  'string.quoted.round.markdown',
  'punctuation.definition.curly.markdown',
  'string.quoted.curly.markdown',
  'punctuation.definition.angle.markdown',
  'string.quoted.angle.markdown',
];

interface TokenizedLine {
  line: string;
  tokens: textmate.IToken[];
}

suite('Markdown Guillemets TextMate grammar', () => {
  let grammar: textmate.IGrammar;
  let tokenizedTestMd: TokenizedLine[];

  suiteSetup(async () => {
    const wasmPath = require.resolve('vscode-oniguruma/release/onig.wasm');
    const wasm = fs.readFileSync(wasmPath).buffer;
    await oniguruma.loadWASM(wasm);

    const registry = new textmate.Registry({
      onigLib: Promise.resolve({
        createOnigScanner: (sources) => new oniguruma.OnigScanner(sources),
        createOnigString: (source) => new oniguruma.OnigString(source),
      }),
      loadGrammar: (scopeName) => {
        const grammarPath = grammarPaths.get(scopeName);
        if (!grammarPath) {
          return Promise.resolve(null);
        }

        const fullPath = path.join(root, grammarPath);
        const rawGrammar = fs.readFileSync(fullPath, 'utf8');
        return Promise.resolve(textmate.parseRawGrammar(rawGrammar, fullPath));
      },
      getInjections: (scopeName) =>
        scopeName === 'text.html.markdown' ? ['markdown.guillemets'] : [],
    });

    const loadedGrammar = await registry.loadGrammar('text.html.markdown');
    if (!loadedGrammar) {
      throw new Error('Markdown grammar should load');
    }
    grammar = loadedGrammar;

    const testMarkdown = fs.readFileSync(path.join(root, 'test.md'), 'utf8');
    tokenizedTestMd = tokenizeDocument(testMarkdown.split(/\r?\n/));
  });

  test('applies custom scopes to the basic bracket examples in test.md', () => {
    assertScopes(
      '«This text should be green» with «bold red guillemets»',
      '«',
      ['punctuation.definition.guillemets.markdown']
    );
    assertScopes(
      '«This text should be green» with «bold red guillemets»',
      'This',
      ['string.quoted.guillemets.markdown']
    );

    assertScopes(
      '[This text should be blue] with [bold purple brackets]',
      '[',
      ['punctuation.definition.square.markdown']
    );
    assertScopes(
      '[This text should be blue] with [bold purple brackets]',
      'This',
      ['string.quoted.square.markdown']
    );

    assertScopes(
      '(This text should be orange) with (bold cyan parentheses)',
      '(',
      ['punctuation.definition.round.markdown']
    );
    assertScopes(
      '(This text should be orange) with (bold cyan parentheses)',
      'This',
      ['string.quoted.round.markdown']
    );

    assertScopes(
      '{This text should be yellow} with {bold red-orange curly braces}',
      '{',
      ['punctuation.definition.curly.markdown']
    );
    assertScopes(
      '{This text should be yellow} with {bold red-orange curly braces}',
      'This',
      ['string.quoted.curly.markdown']
    );

    assertScopes(
      '<This text should be magenta> with <bold dark magenta brackets>',
      '<',
      ['punctuation.definition.angle.markdown']
    );
    assertScopes(
      '<This text should be magenta> with <bold dark magenta brackets>',
      'This',
      ['string.quoted.angle.markdown']
    );
  });

  test('keeps guillemet string scope across the multiline test.md sample', () => {
    assertScopes('«Was von Menschen nicht gewußt,', '«', [
      'punctuation.definition.guillemets.markdown',
    ]);
    assertScopes('Oder nicht bedacht,', 'Oder', [
      'string.quoted.guillemets.markdown',
    ]);
    assertScopes('Wandelt in der Nacht.»', '»', [
      'punctuation.definition.guillemets.markdown',
    ]);
  });

  test('preserves built-in Markdown formatting scopes inside guillemets', () => {
    assertScopes('«This is **bold** text in guillemets»', 'bold', [
      'string.quoted.guillemets.markdown',
      'markup.bold.markdown',
    ]);
    assertScopes('«This is *italic* text in guillemets»', 'italic', [
      'string.quoted.guillemets.markdown',
      'markup.italic.markdown',
    ]);
    assertScopes('«This is `code` in guillemets»', 'code', [
      'string.quoted.guillemets.markdown',
      'markup.inline.raw.string.markdown',
    ]);
    assertScopes('«This is ~~strikethrough~~ in guillemets»', 'strikethrough', [
      'string.quoted.guillemets.markdown',
      'markup.strikethrough.markdown',
    ]);
  });

  test('intentionally highlights Markdown link and image delimiters as prose markers', () => {
    const lines = tokenizeDocument([
      '[Link label](https://example.com) and ![Alt text](image.png)',
    ]);

    assertScopesInLine(lines[0], 'Link label', [
      'string.quoted.square.markdown',
    ]);
    assertScopesInLine(lines[0], 'https://example.com', [
      'string.quoted.round.markdown',
    ]);
    assertScopesInLine(lines[0], 'Alt text', ['string.quoted.square.markdown']);
    assertScopesInLine(lines[0], 'image.png', ['string.quoted.round.markdown']);
  });

  test('keeps an unclosed bracket scope open as a visual warning', () => {
    const lines = tokenizeDocument([
      '[Opening marker',
      'continued warning text',
      'closing marker] after',
    ]);

    assertScopesInLine(lines[1], 'continued', [
      'string.quoted.square.markdown',
    ]);
    assertScopesInLine(lines[2], 'closing', ['string.quoted.square.markdown']);
    assertNoScopesInLine(lines[2], 'after', ['string.quoted.square.markdown']);
  });

  test('does not apply extension scopes inside inline code', () => {
    const lines = tokenizeDocument([
      '`[inline code] (paren) <angle> {curly} «guillemets»`',
    ]);

    for (const needle of ['inline', 'paren', 'angle', 'curly', 'guillemets']) {
      assertNoScopesInLine(lines[0], needle, extensionScopes);
    }
  });

  test('does not apply extension scopes inside fenced code', () => {
    const lines = tokenizeDocument([
      '```js',
      'const x = [1, 2, 3];',
      'const y = "«not prose»";',
      '```',
    ]);

    for (const needle of ['[', ']', '«', 'not prose', '»']) {
      assertNoScopesInLine(
        lines[needle === '[' || needle === ']' ? 1 : 2],
        needle,
        extensionScopes
      );
    }
  });

  function tokenizeDocument(lines: string[]): TokenizedLine[] {
    let ruleStack = textmate.INITIAL;

    return lines.map((line) => {
      const result = grammar.tokenizeLine(line, ruleStack);
      ruleStack = result.ruleStack;

      return {
        line,
        tokens: result.tokens,
      };
    });
  }

  function assertScopes(lineText: string, needle: string, expected: string[]) {
    const line = tokenizedTestMd.find(
      (candidate) => candidate.line === lineText
    );
    if (!line) {
      throw new Error(`Could not find line: ${lineText}`);
    }

    assertScopesInLine(line, needle, expected);
  }

  function assertScopesInLine(
    line: TokenizedLine,
    needle: string,
    expected: string[]
  ) {
    const token = tokenAtNeedle(line, needle);
    for (const scope of expected) {
      if (!token.scopes.includes(scope)) {
        throw new Error(
          `Expected ${JSON.stringify(needle)} in ${JSON.stringify(
            line.line
          )} to include scope ${scope}. Actual scopes: ${token.scopes.join(' ')}`
        );
      }
    }
  }

  function assertNoScopesInLine(
    line: TokenizedLine,
    needle: string,
    unexpected: string[]
  ) {
    const token = tokenAtNeedle(line, needle);
    for (const scope of unexpected) {
      if (token.scopes.includes(scope)) {
        throw new Error(
          `Expected ${JSON.stringify(needle)} in ${JSON.stringify(
            line.line
          )} not to include scope ${scope}. Actual scopes: ${token.scopes.join(
            ' '
          )}`
        );
      }
    }
  }

  function tokenAtNeedle(line: TokenizedLine, needle: string) {
    const index = line.line.indexOf(needle);
    if (index === -1) {
      throw new Error(
        `Could not find ${JSON.stringify(needle)} in ${JSON.stringify(
          line.line
        )}`
      );
    }

    const token = line.tokens.find(
      (candidate) => candidate.startIndex <= index && candidate.endIndex > index
    );
    if (!token) {
      throw new Error(
        `No token found for ${JSON.stringify(needle)} in ${JSON.stringify(
          line.line
        )}`
      );
    }
    return token;
  }
});
