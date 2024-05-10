import _ from 'lodash';
import format from './formatters/format.js';

/* eslint-disable no-restricted-syntax */

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
    } else if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      data[key] = { data: genDiff(data1[key], data2[key]), status: 'nested' };
    } else if (data1[key] !== data2[key]) {
      data[key] = {
        data: { oldData: data1[key], newData: data2[key] },
        status: 'changed',
      };
    } else {
      data[key] = { data: data1[key], status: 'unchanged' };
    }
  }

  const sortedData = _.fromPairs(_.sortBy(_.toPairs(data), ([key]) => key));

  const formattedData = format(sortedData);

  return formattedData;
};

export default genDiff;
