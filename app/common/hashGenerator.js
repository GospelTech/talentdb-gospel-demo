import XXH from 'xxhashjs';

export const generateInstanceID = (
  definitionName,
  isView = false,
  filter = undefined,
) => {
  const hash = XXH.h64(0xdeadbeef);
  hash.update(definitionName);
  hash.update(isView.toString());
  if (filter) {
    hash.update(filter.operator);
    filter.matches.forEach(m => {
      hash.update(m.match);
      hash.update(m.predicate);
      hash.update(m.value);
    });
  }

  return hash.digest().toString(16);
};
