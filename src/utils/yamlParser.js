// eslint-disable-next-line import/no-extraneous-dependencies
import yaml from 'js-yaml';

const parseYaml = (data) => {
  const parsedData = yaml.load(data);
  return parsedData;
};

export default parseYaml;
