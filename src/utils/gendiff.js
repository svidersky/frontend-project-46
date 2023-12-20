/* eslint-disable no-restricted-syntax */
import _ from 'lodash';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => resolve(__dirname, '../../', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8').trim();

const genDiff = (filename1, filename2) => {
  const data1 = JSON.parse(readFile(filename1));
  const data2 = JSON.parse(readFile(filename2));

  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const keys = _.union(keys1, keys2);

  const data = {};
  for (const key of keys) {
    if (!Object.hasOwn(data1, key)) {
      data[key] = `+ ${key}: ${data2[key]}`;
    } else if (!Object.hasOwn(data2, key)) {
      data[key] = `- ${key}: ${data1[key]}`;
    } else if (data1[key] !== data2[key]) {
      data[key] = `- ${key}: ${data1[key]}\n  + ${key}: ${data2[key]}`;
    } else {
      data[key] = `  ${key}: ${data1[key]}`;
    }
  }

  const sortedData = _.fromPairs(_.sortBy(_.toPairs(data), ([key]) => key));

  let result = '';

  for (const key in sortedData) {
    if (_.has(sortedData, key)) result += `  ${data[key]}\n`;
  }

  return `{\n${result}}`;
};

export default genDiff;
