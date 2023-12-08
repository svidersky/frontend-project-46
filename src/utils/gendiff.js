import _ from 'lodash';

const genDiff = (data1, data2) => {
    const keys1 = Object.keys(data1);
    const keys2 = Object.keys(data2);
    const keys = _.union(keys1, keys2);

    const data = {};
    for (const key of keys) {
        if (!Object.hasOwn(data1, key)) {
            data[key] = `+ ${key}: ${data2[key]}`;
        } else if (!Object.hasOwn(data2, key)) {
            data[key] = `- ${key}: ${data1[key]}`;
        } else if (data1[key] !== data2[key]) {
            data[key] = `- ${key}: ${data1[key]}\n  + ${key}: ${data2[key]}`;
        } else {
            data[key] = `  ${key}: ${data1[key]}`;
        }
    }

    const sortedData = _.fromPairs(_.sortBy(_.toPairs(data), ([key]) => key));

    let result = '';

    for (const key in sortedData) {
        result += `  ${data[key]}\n`;
    }

    return `{\n${result}}`;
};

export default genDiff;
