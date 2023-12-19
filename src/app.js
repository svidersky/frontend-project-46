#!/usr/bin/env node

import Path from 'path';
import readFile from './utils/readfile.js';
import parseJson from './utils/parseJson.js';
import genDiff from './utils/gendiff.js';

const app = (filepath1, filepath2) => {
  console.log('--- gendiff library ---\n');

  const data1 = readFile(filepath1);
  const data2 = readFile(filepath2);

  const fileFormat = Path.extname(filepath1).replace('.', '');
  console.log(`file format: ${fileFormat} \n`);

  switch (fileFormat) {
    case 'json': {
      const json1 = parseJson(data1);
      const json2 = parseJson(data2);
      console.log(genDiff(json1, json2));
      break;
    }
    default: {
      console.log('Unknown file format');
    }
  }
};

export default app;
