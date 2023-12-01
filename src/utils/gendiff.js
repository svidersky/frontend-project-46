import _ from 'lodash';

const genDiff = (data1, data2) => {
    const keys1 = Object.keys(data1);
    const keys2 = Object.keys(data2);
    const keys = _.union(keys1, keys2);

    const result = {};
    for (const key of keys) {
        if (!Object.hasOwn(data1, key)) {
            result[key] = 'added';
        } else if (!Object.hasOwn(data2, key)) {
            result[key] = 'deleted';
        } else if (data1[key] !== data2[key]) {
            result[key] = 'changed';
        } else {
            result[key] = 'unchanged';
        }
    }

    return result;
};

export default genDiff;
