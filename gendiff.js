#!/usr/bin/env node

import { Command } from 'commander';
const program = new Command();

const app = () => {
  program
    .description('Compares two configuration files and shows a difference.')
    .version('1.0.0')
    .argument('<filepath1>')
    .argument('<filepath2>')
    .option('-f, --format [format]', 'output format')
    .action((filepath1, filepath2) => {
      console.log('filepath1:', filepath1);
      console.log('filepath2:', filepath2);
    });

  program.parse(process.argv);

  const options = program.opts();
  console.log(options.format);
};

export default app();
