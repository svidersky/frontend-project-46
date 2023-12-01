#!/usr/bin/env node

import Path from 'path';

export const getFileExtention = (filepath) => Path.extname(filepath);
