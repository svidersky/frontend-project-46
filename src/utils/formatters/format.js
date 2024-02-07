import _ from 'lodash';

const format = (data) => {
  const inner = (currentValue, currentDepth) => {
    if (!_.isObject(currentValue)) {
      return `${currentValue}`;
    }

    const replacer = ' ';
    const spacesCount = 2;
    const indentSize = currentDepth * spacesCount;
    const currentIndent = replacer.repeat(indentSize);
    const bracketIndent = replacer.repeat(indentSize - spacesCount);
    const lines = Object
      .entries(currentValue)
      .map(([key, value]) => {
        if (value.status === 'added') {
          return `${currentIndent}+ ${key}: ${value.data}`;
        } if (value.status === 'deleted') {
          return `${currentIndent}- ${key}: ${value.data}`;
        } if (value.status === 'changed') {
          return `${currentIndent}- ${key}: ${value.data.oldData}\n${currentIndent}+ ${key}: ${value.data.newData}`;
        }
        return `${currentIndent.repeat(spacesCount)}${key}: ${value.data}`;
      });

    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };

  const initialDepth = 1;

  return inner(data, initialDepth);
};

export default format;
