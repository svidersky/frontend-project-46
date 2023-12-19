#!/usr/bin/env node

import { Command } from 'commander';
import app from '../src/app.js';

const program = new Command();

const commander = () => {
  program
    .description('Compares two configuration files and shows a difference.')
    .version('1.0.0')
    .argument('<filepath1>')
    .argument('<filepath2>')
    .option('-f, --format [format]', 'output format')
    .action((filepath1, filepath2) => {
      console.log('--- gendiff CLI ---');
      app(filepath1, filepath2);
    });

  program.parse(process.argv);

  const options = program.opts();
  console.log('options:', options.format);
};

export default commander();
