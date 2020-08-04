import React, {RefObject, useContext, useState} from 'react';
import _ from 'lodash';
import Grid from './grid';
import GridData, {emptyCell} from "../classes/gridData";
import Garbage from './garbage'
import Timer from "../classes/timer";
import GroupController from "./groupcontroller";
import {GameContext} from "./game";
import QueueData from "../classes/queueData";

interface PlayerProps {
  id: string;
  name: string;
  // onGarbageGenerated: ((count: number): void => void)
};

interface PlayerState {
  gridData: GridData;
  queueData: QueueData;
  groupX: number;
  groupY: number;
};

  // private timer: Timer | undefined;

  // readonly gamePixelWidth = Math.floor(300 / cellDimensionInGamePixels) / 100;
  // readonly gamePixelHeight = this.gamePixelWidth;

  // componentDidMount() {
  //   this.setState({
  //   })
  //
  //   if (!this.timer) {
  //     // this.timer = new Timer(this.timerHandler.bind(this), 50);
  //   }
  //
  // }
  //
  // componentWillUnmount() {
  //   if (this.timer) {
  //     this.timer.destroy();
  //   }
  // }

  // private timerHandler(): void {
  //   this.top+=3/16;
  //   // if (this.blockElement) {
  //     // this.blockElement.style.top = this.top + "em";
  //   // }
  // }


  // public handleGameTimer() {
  //   const groupY = this.state.groupY + 1;
  //
  //   this.setState(
  //     {
  //       groupY: groupY
  //     }
  //   );
  //   //this.advanceBlockInPixels(2);
  // }

const Player = (props: PlayerProps) => {
  const context = useContext(GameContext);

  const gridData: GridData = new GridData(
    context.fieldWidth,
    context.fieldHeight
  );

  // for debugging layout
  const dataArray = gridData.get();
  for (let i = 0; i < dataArray.length; i++) {
    dataArray[i] = _.random(0,context.colorCount);
  }

  const queueData = new QueueData(context.groupTypeCount);

  const [state, setState] = useState({
    gridData: gridData,
    queueData: queueData,
    groupX: 0,
    groupY: 0,
  });

  return (
    <div className={"player player" + props.id}>
      <div className="queue" />
      <div className="field">
        <Garbage/>
        <Grid
          data={state.gridData}
        />
        <GroupController
          x={0}
          y={3}
          groupType={1}
        />
      </div>
    </div>
  );
}

export default Player;
