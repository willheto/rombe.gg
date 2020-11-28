import './App.css';
import React, { useState, useEffect } from 'react'
import MatchFolder from './matches/MatchFolder'
import Sidepanel from './matches/Sidepanel';

const App = () => {
  const notes = [
    "Minä aion haudata maailman jäähän",
    "Olen Jääsyntyinen",
    "Taistelen kirkkaamman huomisen puolesta",
    "Voimaläiskäys!",
    "Tunne salama",
    "En ole mikään sankari, olen vain Jordle jolla on vasara",
    "Kilpi naamaan!",
    "Mitä tarkoitat että vasarani on liian suuri?",
    "Mahtavemman päättelykyvyn esittely",
    "Vahvistettu tasapainotila",
    "Jos valo kerta kulkee niin nopsaan, miksei se ole saanut kiinni ninjaa?",
    "Tulen olemaan vapaa",
    "Voimaa, kuolemattomuus, kaikkitietävyys...muttei jalkatilaa?",
    "Minä tulen epätekemään sinut",
    "Aito Kohoaminen annetaan vain niille jotka ovat sen arvoisia!",
    "Tunne köynnösten syleily",
    "Tämä maa on minun!",
    "Sadonkorjuun aika on luonamme",
    "Odotas vain kunnes siemeneni juurtuu",
  ]

  return (
    <div class="App">
      <h1>Römbe.gg</h1>
      <h2>"{notes[Math.floor(Math.random()*10)]}"</h2>
      <MatchFolder></MatchFolder>
    </div>
  );
}

export default App;
