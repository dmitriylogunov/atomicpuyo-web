import React from 'react';
import Player from './player';
import './../styles/game.css';

class Game extends React.Component {
  render(): JSX.Element {
    return (
      <div className="game">
        <div className="leftfield"><Player /></div>
        <div className="rightfield"><Player /></div>
      </div>
    )
  }
}

export default Game;
