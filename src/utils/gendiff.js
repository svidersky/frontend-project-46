/* eslint-disable no-restricted-syntax */
import _ from 'lodash';

const genDiff = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const keys = _.union(keys1, keys2);

  const data = {};
  for (const key of keys) {
    if (!_.has(data1, key)) {
      data[key] = { data: data2[key], status: 'added' };
    } else if (!_.has(data2, key)) {
      data[key] = { data: data1[key], status: 'deleted' };
    } else if (data1[key] !== data2[key]) {
      data[key] = { data: { oldData: data1[key], newData: data2[key] }, status: 'changed' };
    } else {
      data[key] = { data: data1[key], status: 'unchanged' };
    }
  }

  const sortedData = _.fromPairs(_.sortBy(_.toPairs(data), ([key]) => key));

  const format = (currentValue, depth) => {
    if (!_.isObject(currentValue)) {
      return `${currentValue}`;
    }

    const replacer = ' ';
    const spacesCount = 2;
    const indentSize = depth * spacesCount;
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

  const result = format(sortedData, 1);

  return result;
};

export default genDiff;
