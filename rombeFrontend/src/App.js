import './App.css';
import React from 'react'
import MatchFolder from './matches/MatchFolder'
import Notes from './notes.json'

const App = () => {

  return (
    <div class="App">
      <h1>Römbe.gg</h1>
      <h2>"{Notes[Math.floor(Math.random()*10)]}"</h2>
      <MatchFolder></MatchFolder>
    </div>
  );
}

export default App;
