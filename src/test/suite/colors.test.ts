import * as assert from 'node:assert/strict';
import { colors } from '../../colors';
import type { ColorInfo } from '../../types';

suite('Colors Test Suite', () => {
  test('Color data structure is valid', () => {
    // Test that color families exist
    assert.ok(colors.red, 'Red color family should exist');
    assert.ok(colors.blue, 'Blue color family should exist');
    assert.ok(colors.green, 'Green color family should exist');
    assert.ok(colors.purple, 'Purple color family should exist');
  });

  test('Color arrays have correct structure', () => {
    // Test that each color family is an array
    const colorFamilies = Object.keys(colors);
    assert.ok(colorFamilies.length > 0, 'Should have color families');

    for (const family of colorFamilies) {
      const colorArray = colors[family as keyof typeof colors];
      if (Array.isArray(colorArray)) {
        assert.ok(colorArray.length > 0, `${family} should have colors`);

        // Check first color has required properties
        const firstColor = colorArray[0] as ColorInfo;
        assert.ok(firstColor.scale, `${family} colors should have scale`);
        assert.ok(firstColor.hex, `${family} colors should have hex`);
        assert.ok(firstColor.rgb, `${family} colors should have rgb`);
        assert.ok(firstColor.hsl, `${family} colors should have hsl`);

        // Verify hex format
        assert.match(
          firstColor.hex,
          /^#[0-9a-f]{6}$/i,
          `${family} hex should be valid format`
        );
      }
    }
  });

  test('Colors have expected scales', () => {
    // Test that colors have common scales like 300, 500, 700
    const blueColors = colors.blue as ColorInfo[];
    const scales = blueColors.map((c) => c.scale);

    assert.ok(scales.includes(300), 'Should have 300 scale');
    assert.ok(scales.includes(500), 'Should have 500 scale');
    assert.ok(scales.includes(700), 'Should have 700 scale');
  });

  test('Hex colors are unique within family', () => {
    const redColors = colors.red as ColorInfo[];
    const hexValues = redColors.map((c) => c.hex);
    const uniqueHexValues = new Set(hexValues);

    assert.strictEqual(
      hexValues.length,
      uniqueHexValues.size,
      'All hex colors should be unique within family'
    );
  });

  test('Scales are in ascending order', () => {
    const greenColors = colors.green as ColorInfo[];

    for (let i = 1; i < greenColors.length; i++) {
      assert.ok(
        greenColors[i].scale >= greenColors[i - 1].scale,
        'Scales should be in ascending order'
      );
    }
  });
});
