#!/usr/bin/env node

import { extname } from 'path';
import genDiff from './utils/gendiff.js';
import readFile from './utils/readfile.js';

const app = (filepath1, filepath2) => {
  const supportedFormats = ['json'];

  const fileFormat = extname(filepath1).replace('.', '');

  if (!supportedFormats.includes(fileFormat)) {
    console.log('Unknown file format');
    return null;
  }

  const data1 = readFile(filepath1);
  const data2 = readFile(filepath2);

  switch (fileFormat) {
    case 'json': {
      const json1 = JSON.parse(data1);
      const json2 = JSON.parse(data2);

      const result = genDiff(json1, json2);

      console.log(result);
      return result;
    }
    default: {
      console.log('Impossible to compare files');
      return null;
    }
  }
};

export default app;
