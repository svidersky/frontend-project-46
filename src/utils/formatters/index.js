import formatStylish from './stylish.js';
import formatPlain from './plain.js';

const format = (data, formatType = 'stylish') => {
  switch (formatType) {
    case 'stylish':
      return formatStylish(data);
    case 'plain':
      return formatPlain(data);
    default:
      throw new Error(`Unknown format: ${formatType}`);
  }
};

export default format;
