import formatStylish from './stylish.js';

const format = (data, formatType = 'stylish') => {
  switch (formatType) {
    case 'stylish':
      return formatStylish(data);
    default:
      throw new Error(`Unknown format: ${formatType}`);
  }
};

export default format;
