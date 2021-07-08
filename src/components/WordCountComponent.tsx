import React, { useEffect, useState } from 'react'
import TableComponent from './TableComponent';
import WordListCount from '../interfaces/interfaces';
import ByOrder from '../interfaces/interfaces';
import LoadingBox from './LoadingBox';
import styles from '../styles/wordCountComponent.module.css';


export default function WordCountComponent() {

  const [loading, setLoading] = useState<boolean>(false);
  const [userInput, setUserInput] = useState<string>('');
  const [wordsList, setWordsList] = useState<string[]>([]);
  const [wordsListCount, setWordsListCount] = useState<WordListCount[]>([]);
  const [sortedWordsList, setSortedWordsList] = useState<WordListCount[]>([]);


  const onUserInput = (e: { target: { value: string; }; }) => {
    setLoading(true);
    setUserInput(e.target.value);
  }

  const getOccurrence = (array: string[], value: string): number => {
    return array.filter((v: string) => (v === value)).length;
  }

  const sortData = (orderBy: ByOrder): void => {
    setTimeout(() => {
      let sortedArray: WordListCount[] = wordsListCount.sort((obj1: WordListCount, obj2: WordListCount) => orderBy.order === 'asc' ? obj1[orderBy.by] < obj2[orderBy.by] ? -1 : 1 : obj1[orderBy.by] > obj2[orderBy.by] ? -1 : 1);
      setSortedWordsList(sortedArray);
    })
  }

  useEffect(() => {
    setWordsListCount(sortedWordsList);
  }, [sortedWordsList])


  useEffect(() => {
    const wordsArray = userInput.replace(/[^a-zA-Z ]/g, '').toLowerCase().split(' ');
    setWordsList(wordsArray);
  }, [userInput]);

  useEffect(() => {
    let wordListCountTmp: WordListCount[] = [];

    wordsList.forEach((word: string, index: number) => {
      wordListCountTmp.push({
        id: index,
        word,
        count: getOccurrence(wordsList, word)
      });
    });

    const wordListCountMap = new Map(wordListCountTmp.map((item: WordListCount) => [item.word, item])).values();

    wordListCountTmp = Array.from(wordListCountMap, ({ id, word, count }) => ({ id, word, count }));

    wordListCountTmp = wordListCountTmp.filter((item: WordListCount) => item.word !== '');

    wordListCountTmp = wordListCountTmp.map((item: WordListCount, index: number) => ({ id: index, word: item.word, count: item.count }))

    setWordsListCount(wordListCountTmp);
    setTimeout(() => setLoading(false), 1000)
  }, [wordsList]);

  return (
    <div className={`${styles.wordCountComponent} d-flex col-md-10 offset-1 justify-content-evenly mt-5`}>
      <div className="text-area-container col-md-5">
        <textarea rows={Math.round(wordsList.length / 8)} className="form-control" id="floatingTextarea" onChange={onUserInput}></textarea>
      </div>
      <div className="words-table col-md-6">
        {loading ? (
          <LoadingBox></LoadingBox>
        ) :
          wordsListCount.length ? (
            <TableComponent wordsListCount={wordsListCount} sortData={sortData}></TableComponent>
          ) : (
            <p>Please start typing for results</p>
          )}
      </div>
    </div>
  )
}
