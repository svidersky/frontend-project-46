import { expect, test } from '@jest/globals';
import genDiff from './gendiff.js';

test('genDiff', () => {
  const data1 = {
    host: 'hexlet.io',
  };

  const data2 = {};
  const expected = '{\n  - host: hexlet.io\n}';

  expect(genDiff(data1, data2)).toEqual(expected);
});
