import * as assert from 'node:assert/strict';
import * as fs from 'node:fs';
import * as path from 'node:path';

declare const suite: Mocha.SuiteFunction;
declare const test: Mocha.TestFunction;

const root = path.resolve(__dirname, '../..');

suite('Extension manifest', () => {
  const packageJson = JSON.parse(
    fs.readFileSync(path.join(root, 'package.json'), 'utf8')
  );

  test('declares the extension entrypoint and command', () => {
    assert.strictEqual(packageJson.main, './out/extension.js');
    assert.deepStrictEqual(packageJson.activationEvents, [
      'onLanguage:markdown',
    ]);

    const command = packageJson.contributes.commands.find(
      (candidate: { command: string }) =>
        candidate.command === 'markdown-guillemets.customizeColors'
    );
    assert.ok(command, 'customizeColors command should be contributed');
  });

  test('contributes the Markdown injection grammar', () => {
    const grammar = packageJson.contributes.grammars.find(
      (candidate: { scopeName: string }) =>
        candidate.scopeName === 'markdown.guillemets'
    );

    assert.ok(grammar, 'markdown.guillemets grammar should be contributed');
    assert.deepStrictEqual(grammar.injectTo, ['text.html.markdown']);
    assert.strictEqual(
      grammar.path,
      './syntaxes/markdown-guillemets.tmLanguage.json'
    );
  });

  test('ships default TextMate color customizations', () => {
    const rules =
      packageJson.contributes.configurationDefaults[
        'editor.tokenColorCustomizations'
      ].textMateRules;
    const scopes = rules.map((rule: { scope: string }) => rule.scope);

    for (const scope of [
      'punctuation.definition.guillemets.markdown',
      'punctuation.definition.square.markdown',
      'punctuation.definition.round.markdown',
      'punctuation.definition.curly.markdown',
      'punctuation.definition.angle.markdown',
      'markup.bold.markdown',
      'markup.italic.markdown',
      'markup.inline.raw.string.markdown',
      'markup.strikethrough.markdown',
    ]) {
      assert.ok(scopes.includes(scope), `${scope} should have a default rule`);
    }
  });

  test('keeps test scaffolding out of packaged VSIX output', () => {
    const vscodeIgnore = fs.readFileSync(
      path.join(root, '.vscodeignore'),
      'utf8'
    );

    assert.match(vscodeIgnore, /^src\/\*\*$/mu);
    assert.match(vscodeIgnore, /^out\/test\/\*\*$/mu);
    assert.match(vscodeIgnore, /^\.husky\/\*\*$/mu);
  });
});
