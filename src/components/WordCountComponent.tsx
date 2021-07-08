import React, { useEffect, useState } from 'react'
import TableComponent from './TableComponent';
import WordListCount from '../interfaces/interfaces';
import LoadingBox from './LoadingBox';
import styles from '../styles/wordCountComponent.module.css';


export default function WordCountComponent() {

  const [loading, setLoading] = useState<boolean>(false);
  const [userInput, setUserInput] = useState<string>('');
  const [wordsList, setWordsList] = useState<string[]>([]);
  const [wordsListCount, setWordsListCount] = useState<WordListCount[]>([]);


  const onUserInput = (e: { target: { value: string; }; }) => {
    setLoading(true);
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
    setTimeout(() => setLoading(false), 1000)
  }, [wordsList]);

  return (
    <div className={`${styles.wordCountComponent} d-flex col-md-10 offset-1 justify-content-evenly mt-5`}>
      <div className="text-area-container col-md-4">
        <label htmlFor="floatingTextarea">Type here</label>
        <textarea rows={Math.round(wordsList.length / 8)} className="form-control" id="floatingTextarea" onChange={onUserInput}></textarea>
      </div>
      <div className="words-table col-md-6">
        {wordsListCount.length && !loading ? (
          <TableComponent wordsListCount={wordsListCount}></TableComponent>
        ) :
          loading ? (
            <LoadingBox></LoadingBox>
          ) : (
            <p>Please start typing for results</p>
          )}
      </div>
    </div>
  )
}
