#!/usr/bin/env node

import { readFileSync } from 'fs';
import Path from 'path';

export default (filepath) => readFileSync(Path.resolve(filepath), { encoding: 'utf8', flag: 'r' });
