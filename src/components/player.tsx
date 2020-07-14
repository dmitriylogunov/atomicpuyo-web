import React from 'react';
import GridComponent from './gridcomponent';

class Player extends React.Component {
  render(): JSX.Element {
    return(
      <div className="player-field">
        <div className="garbage" />
        <GridComponent />
      </div>
    )
  }
}

export default Player;
