import React, {useCallback, useContext, useEffect, useState} from 'react';
import Grid from './grid';
import Garbage from './garbage'
import GroupController from "./groupcontroller";
import {GameContext} from "./game";
import QueueData from "../classes/queue_data";
import GridData from "../classes/grid_data";

interface PlayerProps {
  id: number;
  name: string;
  onPauseToggle: (playerId: number) => void;
  onGarbageGenerated: (playerId: number, garbageCount: number) => void;
}

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
const keyCodes = {
  keyUp: 38,
  keyDown: 40,
  keyLeft: 37,
  keyRight: 39,
  keySpace: 32,
  keyEsc: 27,
}

const Player = (props: PlayerProps) => {
  const context = useContext(GameContext);

  useEffect(() => {
    const handleKeyboard = (event: any) => {
      if (event.keyCode === keyCodes.keyEsc) {
        props.onPauseToggle(props.id);
      }
    }

    document.addEventListener("keydown", handleKeyboard, false);

    return () => {
      document.removeEventListener("keydown", handleKeyboard, false);
    };
  }, []);

  const gridData: GridData = new GridData(
    context.fieldWidth,
    context.fieldHeight
  );

  // for debugging layout
  // const dataArray = gridData.get();
  // for (let i = 0; i < dataArray.length; i++) {
  //   dataArray[i] = _.random(0,context.colorCount);
  // }

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
