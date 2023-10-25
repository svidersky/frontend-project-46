#!/usr/bin/env node

import { Command } from 'commander';
const program = new Command();

const app = () => {
  program
    .description('Compares two configuration files and shows a difference.')
    .version('1.0.0');

  program.parse();
};

export default app();
