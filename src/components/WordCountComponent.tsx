import React, { useEffect, useState } from 'react'
import TableComponent from './TableComponent';


interface WordListCount {
  word: string
  count: number
}

export default function WordCountComponent() {

  const [userInput, setUserInput] = useState<string>('');
  const [wordsList, setWordsList] = useState<string[]>([]);
  const [wordsListCount, setWordsListCount] = useState<WordListCount[]>([]);


  const onUserInput = (e: { target: { value: string; }; }) => {
    setUserInput(e.target.value);
  }

  function getOccurrence(array: string[], value: string) {
    return array.filter((v: string) => (v === value)).length;
  }

  useEffect(() => {
    const wordsArray = userInput.split(' ');
    setWordsList(wordsArray);
  }, [userInput]);

  useEffect(() => {
    let wordListCountTmp: WordListCount[] = [];

    wordsList.forEach((word: string) => {
      wordListCountTmp.push({
        word,
        count: getOccurrence(wordsList, word)
      });
    });

    const wordListCountMap = new Map(wordListCountTmp.map((item: WordListCount) => [item.word, item])).values();

    wordListCountTmp = Array.from(wordListCountMap, ({ word, count }) => ({ word, count }));

    wordListCountTmp = wordListCountTmp.filter((item: WordListCount) => item.word !== '');

    setWordsListCount(wordListCountTmp);

  }, [wordsList]);

  return (
    <div>
      <textarea onChange={onUserInput} name="text-area" id="text-area"></textarea>
      <ul>
        {wordsListCount.map((item: WordListCount, i: number) => (
          <li key={i}>{item.word} ---- {item.count}</li>
        ))}
      </ul>
      <TableComponent></TableComponent>
    </div>
  )
}
