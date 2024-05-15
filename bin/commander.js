#!/usr/bin/env node

import { Command } from 'commander';
import app from '../src/app.js';

const program = new Command();

const commander = () => {
  program
    .description('Compares two configuration files and shows a difference.')
    .version('1.5.1')
    .argument('<filepath1>')
    .argument('<filepath2>')
    .option('-f, --format <type>', 'output format', 'stylish')
    .action((filepath1, filepath2) => {
      console.log(app(filepath1, filepath2, program.opts().format));
    });

  program.parse(process.argv);
};

export default commander();
