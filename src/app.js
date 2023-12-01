#!/usr/bin/env node

import { readFile } from './utils/readfile.js';
import { parseJson } from './utils/parseJson.js';
import { getFileExtention } from './utils/getFileExtention.js';
import genDiff from './utils/gendiff.js';

const app = (filepath1, filepath2) => {
  console.log('--- gendiff library ---\n');
    // https://ru.hexlet.io/topics/85327 abosolute VS relative path

  const data1 = readFile(filepath1);
  const data2 = readFile(filepath2);

  const fileFormat = getFileExtention(filepath1).replace('.', '');
  console.log(`file format: ${fileFormat} \n`);

  switch (fileFormat) {
    case 'json':
      const json1 = parseJson(data1);
      const json2 = parseJson(data2);
      console.log('result:', genDiff(json1, json2));
      break;
  }
};

export default app;
