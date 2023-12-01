#!/usr/bin/env node

import { readFileSync } from 'fs';
import Path from 'path';

export const readFile = (filepath) => readFileSync(Path.resolve(filepath), { encoding: 'utf8', flag: 'r' });
