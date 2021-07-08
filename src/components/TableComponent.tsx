import React, { useEffect, useState } from 'react';
import WordListCount from '../interfaces/interfaces';
import ByOrder from '../interfaces/interfaces';
import styles from '../styles/tableComponent.module.css';

const TableComponent = ({ wordsListCount, sortData }: any) => {

  const [orderByArray, setOrderByArray] = useState<ByOrder[]>([{ by: 'id', order: 'desc' }, { by: 'word', order: 'desc' }, { by: 'count', order: 'desc' }]);
  const [orderByArrayTmp, setOrderByArrayTmp] = useState<ByOrder[]>([]);

  const sortDataBy = (orderByTmp: ByOrder): void => {
    sortData(orderByTmp);
  }

  const handleClick = (e: any): void => {
    const by = e.target.getAttribute('id');

    let orderByArrayTmp = orderByArray.map(item => {
      if (item.by === by) {
        item.order = item.order === 'desc' ? 'asc' : 'desc';
      }
      return item;
    });



    const orderBy = orderByArrayTmp.find(item => item.by === by);

    sortDataBy(orderBy!);
    setOrderByArrayTmp(orderByArrayTmp);
  }

  useEffect(() => {
    if (orderByArrayTmp.length)
      setTimeout(() => setOrderByArray(orderByArrayTmp))
  }, [orderByArrayTmp])

  return (
    <div className={styles.tableComponent}>
      <table className="table">
        <thead>
          <tr>
            <th scope="col" id="id" onClick={handleClick}>#</th>
            <th scope="col" id="word" onClick={handleClick}>Word</th>
            <th scope="col" id="count" onClick={handleClick}>Ocurrence</th>
          </tr>
        </thead>
        <tbody>
          {wordsListCount.map((item: WordListCount, i: number) => (
            <tr key={item.id}>
              <th scope="row">{item.id}</th>
              <td>{item.word}</td>
              <td>{item.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableComponent;
