import React from 'react';
import WordListCount from '../interfaces/interfaces';
import styles from '../styles/tableComponent.module.css';

const TableComponent = ({ wordsListCount }: WordListCount[] | any) => {

  return (
    <div className={styles.tableComponent}>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Word</th>
            <th scope="col">Ocurrence</th>
          </tr>
        </thead>
        <tbody>
          {wordsListCount.map((item: WordListCount, i: number) => (
            <tr key={i}>
              <th scope="row">{i + 1}</th>
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
