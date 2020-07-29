import React, {RefObject} from 'react';
import Grid, {emptyCell, GridData} from './grid';
import Garbage from './garbage'
import Timer from "../classes/timer";
import Group, {groupTypeIBlock} from "./group";

interface PlayerProps {
  id: string,
  name: string,
  // onGarbageGenerated: ((count: number): void => void)
  fieldWidth: number,
  fieldHeight: number,
  coloursCount: number,
  gameSpeed: number,
};

type PlayerState = {
  gridData: GridData,
  groupX: number,
  groupY: number,
  groupIsVisible: boolean,
};

class Player extends React.Component<PlayerProps, PlayerState> {
  private timer: Timer | undefined;

  private readonly gridRef: RefObject<Grid>;
  private readonly groupRef: RefObject<Group>;

  // readonly gamePixelWidth = Math.floor(300 / cellDimensionInGamePixels) / 100;
  // readonly gamePixelHeight = this.gamePixelWidth;


  componentDidMount() {
    this.setState({

    })

    if (!this.timer) {
      // this.timer = new Timer(this.timerHandler.bind(this), 50);
    }

  }

  componentWillUnmount() {
    if (this.timer) {
      this.timer.destroy();
    }
  }

  private top = 0;

  timerHandler(): void {
    this.top+=3/16;
    // if (this.blockElement) {
      // this.blockElement.style.top = this.top + "em";
    // }
  }

  constructor(props: PlayerProps) {
    super(props);

    const data: GridData = new Array<number>(props.fieldHeight * props.fieldWidth).fill(emptyCell);

    // for debugging layout
    // for (let i = 0; i < data.length; i++) {
    //   data[i] = Math.floor(Math.random() * 6);
    // }

    this.state = {
      gridData: data,
      groupX: 0,
      groupY: 0,
      groupIsVisible: false,
    }

    this.gridRef = React.createRef();
    this.groupRef = React.createRef();
  }

  public handleGameTimer() {
    // Intentionally not copying instances for better performance
    const gridData = this.state.gridData;
    const groupY = this.state.groupY + 1;

    this.setState(
      {
        groupY: groupY
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
            ref={this.gridRef}

            data={this.state.gridData}
            width={this.props.fieldWidth}
            height={this.props.fieldHeight}
          />
          <Group
            ref={this.groupRef}

            colorsCount={this.props.coloursCount}
            groupType={groupTypeIBlock}
            isVisible={true}
            x={this.state.groupX}
            y={this.state.groupY}
          />
        </div>
      </div>
    )
  }
}

export default Player;
