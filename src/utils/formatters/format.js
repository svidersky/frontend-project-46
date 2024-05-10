import _ from 'lodash';

const format = (data) => {
  const inner = (currentValue, currentDepth) => {
    if (!_.isObject(currentValue)) {
      return `${currentValue}`;
    }

    const replacer = ' ';
    const spacesCount = 2;
    const indentSize = currentDepth * spacesCount;
    const currentIndent = replacer.repeat(indentSize * 2);
    const bracketIndent = replacer.repeat(indentSize - spacesCount);
    const lines = Object.entries(currentValue).map(([key, value]) => {
      if (!value.status) return `${key}: ${inner(value, currentDepth + 1)}`;

      if (value.status === 'nested') {
        return `${currentIndent}${key}: ${inner(value.data, currentDepth + 1)}`;
      }
      if (value.status === 'added') {
        if (_.isObject(value.data)) {
          return `${currentIndent}+ ${key}: ${inner(value.data, currentDepth + 1)}`;
        }
        return `${currentIndent}+ ${key}: ${value.data}`;
      }
      if (value.status === 'deleted') {
        if (_.isObject(value.data)) {
          return `${currentIndent}- ${key}: ${inner(value.data, currentDepth + 1)}`;
        }
        return `${currentIndent}- ${key}: ${value.data}`;
      }
      if (value.status === 'changed') {
        if (_.isObject(value.data.oldData)) {
          return `${currentIndent}- ${key}: ${inner(value.data.oldData, currentDepth + 1)}`;
        }
        const oldData = value.data ? value.data.oldData : null;
        const newData = value.data ? value.data.newData : null;
        return `${currentIndent}- ${key}: ${oldData}\n${currentIndent}+ ${key}: ${newData}`;
      }
      return `${currentIndent.repeat(spacesCount)}${key}: ${value.data}`;
    });

    return ['{', ...lines, `${bracketIndent}}`].join('\n');
  };

  const initialDepth = 1;

  return inner(data, initialDepth);
};

export default format;
