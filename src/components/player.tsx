import React from 'react';
import Grid from './grid';
import GroupData from "../classes/groupdata";
import Garbage from './garbage'
import Timer from "../classes/timer";
import BlockData from "../classes/blockdata";
import GamePixel, {cellDimensionInGamePixels, getGridValueOfGamePixel} from "../classes/gamepixel";

interface PlayerProps {
  id: string,
  name: string,
  // onGarbageGenerated: ((count: number): void => void)
  fieldWidth: number,
  fieldHeight: number,
  numberOfColors: number,
  gameSpeed: number,
};

type PlayerState = {
  gridData: GroupData,
  blockData?: BlockData,
};

class Player extends React.Component<PlayerProps, PlayerState> {
  private timer: Timer | undefined;

  componentDidMount() {
    const blockData = new BlockData(
      this.props.numberOfColors,
      2 * cellDimensionInGamePixels,
      0
    );

    this.setState({
      blockData: blockData,
    })

    // this.timer = new Timer(this.handleGameTimer.bind(this), 50);
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
      blockData: undefined,
    }
  }

  public handleGameTimer() {
    // Intentionally not copying instances for better performance
    const gridData = this.state.gridData;
    const blockData = this.state.blockData;

    // blockData.advanceBlockInPixels(this.props.gameSpeed);

    this.setState(
      {
        blockData: blockData
      }
    );
    //this.advanceBlockInPixels(2);
  }

  render(): JSX.Element {
    return (
      <div className={"player player" + this.props.id}>
        <div className="queue" />
        <div className="field">
          <Garbage/>
          <Grid
            gridData = {this.state.gridData}
            linkedBlock = {this.state.blockData}
          />
        </div>
      </div>
    )
  }
}

export default Player;
