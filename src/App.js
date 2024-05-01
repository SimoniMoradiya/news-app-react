// src/App.js
import React from 'react';
import './App.css';
import News from './News.js';

function App() {
  return (
    <div className="App">
      <h1 className="text-center mt-5">Filterable News Application</h1>
      <News />
    </div>
  );
}

export default App;

