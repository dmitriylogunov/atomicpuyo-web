import React from 'react';
import Grid from './grid';
import Garbage from './garbage'
import Group from "./group";

class Player extends React.Component<{
  id: string
  name: string
  // onGarbageGenerated: ((count: number): void => void)
}, {}> {

  public handleGameTimer() {

  }


  render(): JSX.Element {

    let group = '';

    return (
      <div>
        <div className="queue" />
        <div className="field">
          <Garbage/>
          <Grid gridWidth={6} gridHeight={12}/>
          {group}
        </div>
      </div>
    )
  }
}

export default Player;
