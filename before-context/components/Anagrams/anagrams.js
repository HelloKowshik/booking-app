export function getAnagrams(source) {
  if (source.length < 2) {
    return [...source];
  }
  const anagrams = [];
  const letters = [...source];
  letters.forEach((letter, ind) => {
    const without = [...letters];
    without.splice(ind, 1);
    getAnagrams(without).forEach((anagram) => {
      anagrams.push(letter + anagram);
    });
  });
  return anagrams;
}

export function getDistinct(anagrams) {
  return [...new Set(anagrams)];
}
