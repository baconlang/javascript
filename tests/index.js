const alpha = 'abcdefghijklmnopqrstuvwxyz';
export function symGen(binary) {
  const symbolMap = {};
  binary.split('').forEach((bit, i) => symbolMap[alpha[i]] = parseInt(bit))
  return symbolMap;
}
