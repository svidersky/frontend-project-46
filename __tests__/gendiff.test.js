import { expect, it } from '@jest/globals';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => resolve(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8').trim();

it('compares JSON', () => {
  const filepath1 = getFixturePath('file1.json');
  const filepath2 = getFixturePath('file2.json');
  const expected = readFile('expectedResult.txt');

  expect(genDiff(filepath1, filepath2)).toEqual(expected);
});

it('compares YAML', () => {
  const filepath1 = getFixturePath('file1.yaml');
  const filepath2 = getFixturePath('file2.yaml');
  const expected = readFile('expectedResult.txt');

  expect(genDiff(filepath1, filepath2)).toEqual(expected);
});

it('compares YML', () => {
  const filepath1 = getFixturePath('file1.yml');
  const filepath2 = getFixturePath('file2.yml');
  const expected = readFile('expectedResult.txt');

  expect(genDiff(filepath1, filepath2)).toEqual(expected);
});

it('provides an non-supported format', () => {
  const filepath1 = 'file1.txt';
  const filepath2 = 'file2.txt';

  expect(genDiff(filepath1, filepath2)).toBeNull();
});
