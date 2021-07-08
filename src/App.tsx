import React from 'react';
import './App.css';
import WordCountComponent from './components/WordCountComponent';

function App() {
  return (
    <div className="App">
      <header>
        <h1>
          Word Count App
        </h1>
      </header>
      <WordCountComponent></WordCountComponent>
    </div>
  );
}

export default App;
