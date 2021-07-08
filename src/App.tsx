import React from 'react';
import './App.css';
import WordCountComponent from './components/WordCountComponent';

function App() {
  return (
    <div className="App">
      <header className="my-5">
        <h1 className="py-3">
          Word Count App
        </h1>
      </header>
      <WordCountComponent></WordCountComponent>
    </div>
  );
}

export default App;
