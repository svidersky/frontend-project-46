#!/usr/bin/env node

import { extname } from 'path';
import genDiff from './utils/gendiff.js';
import format from './utils/formatters/index.js';
import readFile from './utils/readfile.js';
import parseYaml from './utils/yamlParser.js';
import parseJson from './utils/jsonParser.js';

// eslint-disable-next-line consistent-return
const app = (filepath1, filepath2, formatType) => {
  const supportedFormats = ['json', 'yaml', 'yml'];

  const fileFormat = extname(filepath1).replace('.', '');

  if (!supportedFormats.includes(fileFormat)) {
    console.log(
      `Unknown file format: ${fileFormat}, add support for it if needed`,
    );
    return null;
  }

  const data1 = readFile(filepath1);
  const data2 = readFile(filepath2);

  // eslint-disable-next-line default-case
  switch (fileFormat) {
    case 'json': {
      const json1 = parseJson(data1);
      const json2 = parseJson(data2);

      const difference = genDiff(json1, json2);
      return format(difference, formatType);
    }
    case 'yaml':
    case 'yml': {
      const yml1 = parseYaml(data1);
      const yml2 = parseYaml(data2);

      const difference = genDiff(yml1, yml2);
      return format(difference, formatType);
    }
  }
};

export default app;
