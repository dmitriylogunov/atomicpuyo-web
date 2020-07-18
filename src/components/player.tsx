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
      <div classname="queue">

      </div>
      <div className="field">
        <div className="garbage"/>
        <Garbage/>
        <Grid/>
        {group}
      </div>
    )
  }
}

export default Player;
