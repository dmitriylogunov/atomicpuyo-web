import React from 'react';
import Grid from './grid';
import Garbage from './garbage'

class Player extends React.Component<{
  id: string
  name: string
  // onGarbageGenerated: ((count: number): void => void)
}, {}> {
  render(): JSX.Element {
    return (
      <div className="field">
        <div className="garbage"/>
        <Garbage/>
        <Grid/>
      </div>
    )
  }
}

export default Player;
