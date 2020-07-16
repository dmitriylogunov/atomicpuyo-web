import React from 'react';
import GridComponent from './gridcomponent';
import Garbage from './garbage'

class Player extends React.Component {
  render(): JSX.Element {
    return (
      <div className="field">
        <div className="garbage"/>
        <Garbage/>
        <GridComponent/>
      </div>
    )
  }
}

export default Player;
