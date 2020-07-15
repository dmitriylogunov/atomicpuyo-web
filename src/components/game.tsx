import React from 'react';
import Player from './player';
import './../styles/game.scss';

class Game extends React.Component {
  render(): JSX.Element {
    return (
      <div className="game">
        <div className="player player1"><Player /></div>
        <div className="player player2"><Player /></div>
      </div>
    )
  }
}

export default Game;
