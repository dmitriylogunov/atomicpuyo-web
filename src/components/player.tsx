import React from 'react';
import Grid, { GridData } from './grid';
import Garbage from './garbage'

type PlayerProps = {
  id: string,
  name: string,
  // onGarbageGenerated: ((count: number): void => void)
  fieldWidth: number,
  fieldHeight: number,
};

type PlayerState = {
  gridData: GridData
};

class Player extends React.Component<PlayerProps, PlayerState> {

  private readonly  = 3;

  constructor(props: PlayerProps) {
    super(props);

    let data: Array<number> = new Array<number>(this.props.fieldHeight * this.props.fieldWidth).fill(GridData.emptyCell);

    // for debugging layout
    // for (let i = 0; i < data.length; i++) {
    //   data[i] = Math.floor(Math.random() * 6);
    // }

    let gridData: GridData = new GridData(
      this.props.fieldWidth,
      this.props.fieldHeight,
      data
    );

    this.state = {
      gridData: gridData
    }

  }


  public handleGameTimer() {

  }

  render(): JSX.Element {
    let group = '';
    let gridData = this.state.gridData;

    return (
      <div>
        <div className="queue" />
        <div className="field">
          <Garbage/>
          <Grid
            gridData={gridData}
          />
          {group}
        </div>
      </div>
    )
  }
}

export default Player;
