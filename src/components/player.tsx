import React from 'react';
import Grid, { LinkedBlock } from './grid';
import GroupData from "../classes/groupdata";
import Garbage from './garbage'

type PlayerProps = {
  id: string,
  name: string,
  // onGarbageGenerated: ((count: number): void => void)
  fieldWidth: number,
  fieldHeight: number,
};

type PlayerState = {
  gridData: GroupData,
  blockData: LinkedBlock | undefined
};

class Player extends React.Component<PlayerProps, PlayerState> {

  private readonly  = 3;

  constructor(props: PlayerProps) {
    super(props);

    let data: Array<number> = new Array<number>(this.props.fieldHeight * this.props.fieldWidth).fill(GroupData.emptyCell);

    // for debugging layout
    // for (let i = 0; i < data.length; i++) {
    //   data[i] = Math.floor(Math.random() * 6);
    // }

    let gridData: GroupData = new GroupData(
      this.props.fieldWidth,
      this.props.fieldHeight,
      data
    );

    this.state = {
      gridData: gridData,
      blockData: undefined
    }
  }

  public handleGameTimer() {

  }

  render(): JSX.Element {
    return (
      <div>
        <div className="queue" />
        <div className="field">
          <Garbage/>
          <Grid
            gridData={this.state.gridData}
            blockData={this.state.blockData}
          />
        </div>
      </div>
    )
  }
}

export default Player;
