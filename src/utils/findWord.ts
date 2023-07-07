export function findWord(targetWord: string, lettersKit: string[], vocabulary: string[]) {
  const letters = lettersKit.map((letter) => letter.toLocaleLowerCase());

  function howManyRepeats(str: string, letter: string) {
    let count = 0;
    for (let i = 0; i < str.length; i++) {
      if (letter === str[i]) count += 1;
    }
    return count;
  }

  const duplicatedLettersMap = letters.reduce(function (prev, cur) {
    //@ts-ignore
    prev[cur] = (prev[cur] || 0) + 1;
    return prev;
  }, {});

  targetWord = targetWord.toLocaleLowerCase().replaceAll("*", ".");
  //

  const targetWordMask = [];
  for (let i = 0; i < targetWord.length; i++) {
    if (targetWord[i] !== ".") targetWordMask.push(targetWord[i]);
    else
      targetWordMask.push(
        `[${[...new Set(letters)].toLocaleString().replaceAll(",", "")}]`
      );
  }

  const targetWordMaskPrepared = new RegExp(
    "^" + targetWordMask.toLocaleString().replaceAll(",", "") + "$"
  );

  const findWords = () => {
    const targetWords = vocabulary.filter((item) =>
      targetWordMaskPrepared.test(item)
    );

    const targetWordsFilteredDuplicatedTargetLetters = targetWords.filter(
      (word) => {
        let shouldBeFiltered = 0;

        word.split("").forEach((letter) => {
          //@ts-ignore
          if (howManyRepeats(word, letter) > duplicatedLettersMap[letter])
            shouldBeFiltered += 1;
        });

        if (shouldBeFiltered) return false;
        else return true;
      }
    );
    // filter without big letters
    return targetWordsFilteredDuplicatedTargetLetters;
  };



  return findWords();
}