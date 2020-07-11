import React from 'react';
import Field from './field';

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="leftfield"><Field /></div>
        <div className="rightfield"><Field /></div>
      </div>
    )
  }
}

export default Game;
