#!/usr/bin/env node
import _ from 'lodash';

const buildTree = (data1, data2) => {
  const keys1 = _.keys(data1);
  const keys2 = _.keys(data2);
  const sortedKeys = _.sortBy(_.union(keys1, keys2));

  const children = sortedKeys.map((key) => {
    if (!_.has(data1, key)) {
      return {
        status: 'added',
        key,
        value: data2[key],
      };
    }
    if (!_.has(data2, key)) {
      return {
        status: 'removed',
        key,
        value: data1[key],
      };
    } if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      return {
        status: 'nested',
        key,
        children: buildTree(data1[key], data2[key]),
      };
    }
    if (_.isEqual(data1[key], data2[key])) {
      return {
        status: 'unchanged',
        key,
        value: data2[key],
      };
    }
    return {
      status: 'changed',
      key,
      value: data1[key],
      value2: data2[key],
    };
  });
  return children;
};

const genDiff = (data1, data2) => ({
  status: 'root',
  children: buildTree(data1, data2),
});

export default genDiff;
