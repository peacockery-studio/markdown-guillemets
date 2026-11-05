import * as assert from 'node:assert/strict';
import { PRESET_THEMES, presetThemeOptions } from '../presets';

declare const suite: Mocha.SuiteFunction;
declare const test: Mocha.TestFunction;

suite('Preset themes', () => {
  test('lists the recommended theme first and every theme once', () => {
    const labels = presetThemeOptions().map((option) => option.label);

    assert.strictEqual(labels[0], 'Default (Recommended)');
    assert.deepStrictEqual(
      [...labels].sort(),
      Object.keys(PRESET_THEMES).sort()
    );
  });

  test('describes each theme by its guillemets and brackets colors', () => {
    for (const { detail, theme } of presetThemeOptions()) {
      assert.strictEqual(
        detail,
        `Guillemets: ${theme['guillemets-symbol']} • Brackets: ${theme['brackets-symbol']}`
      );
    }
  });
});
