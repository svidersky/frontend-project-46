const formatPlain = (tree) => tree.map((node) => {
  const { key } = node;
  const { value } = node;
  const { value2 } = node;
  const { status } = node;
  const { children } = node;
  const { keyPath } = node;
  switch (status) {
    case 'nested':
      return formatPlain(children.map((child) => ({
        ...child,
        keyPath: keyPath ? `${keyPath}.${key}` : key,
      })));
    case 'added':
      return `Property '${keyPath ? `${keyPath}.${key}` : key}' was added with value: ${value}`;
    case 'removed':
      return `Property '${keyPath ? `${keyPath}.${key}` : key}' was removed`;
    case 'changed':
      return `Property '${keyPath ? `${keyPath}.${key}` : key}' was updated. From ${value} to ${value2}`;
    case 'unchanged':
      return `Property '${keyPath ? `${keyPath}.${key}` : key}' was not changed`;
    default:
      throw new Error(`Unknown status: ${status}`);
  }
});

export default formatPlain;
