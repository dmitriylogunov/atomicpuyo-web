import React from 'react';
import Grid from './grid';
import GroupData from "../classes/groupdata";
import Garbage from './garbage'
import Timer from "../classes/timer";
import BlockData from "../classes/blockdata";

type PlayerProps = {
  id: string,
  name: string,
  // onGarbageGenerated: ((count: number): void => void)
  fieldWidth: number,
  fieldHeight: number,
  numberOfColors: number
};

type PlayerState = {
  gridData: GroupData,
  blockData: BlockData | undefined
};

class Player extends React.Component<PlayerProps, PlayerState> {
  private timer: Timer | undefined;

  componentDidMount() {
    this.timer = new Timer(this.handleGameTimer, 1000);
  }

  componentWillUnmount() {
    if (this.timer) {
      this.timer.destroy();
    }
  }

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
    if (!this.state.blockData) {
      const blockData = new BlockData(this.props.numberOfColors);
    }
  }

  render(): JSX.Element {
    return (
      <div>
        <div className="queue" />
        <div className="field">
          <Garbage/>
          <Grid
            gridData={this.state.gridData}
            linkedBlock = {this.state.blockData}
            blockXPix = {0}
            blockYPix = {0}
          />
        </div>
      </div>
    )
  }
}

export default Player;
