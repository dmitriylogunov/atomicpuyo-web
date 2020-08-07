import React from 'react';
import './styles/app.scss';
import Game from './components/game';

function App() {
  return (
    <div className="App">
      <Game
        colorCount = {4}
        groupTypeCount = {4}
        fieldWidth = {6}
        fieldHeight = {12}
      />
    </div>
  );
}

export default App;
