import React, {useEffect, useState} from 'react';
import Grid from './grid';
import Garbage from './garbage'
import GroupBeingPlayed from "./groupbeingplayed";
import GroupQueueData from "../classes/group_queue_data";
import GridData from "../classes/grid_data";
import Group from "./group";
import GroupQueue from "./group_queue";
import _ from 'lodash';

export type PlayerControlType = "local" | "ai" | "remote";

interface PlayerProps {
  id: number;
  name: string;
  control: PlayerControlType;
  isPaused: boolean;

  fieldWidth: number;
  fieldHeight: number;
  groupTypeCount: number;
  colourCount: number;

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
  const handleKeyboard = (event: any) => {
    if (event.keyCode === keyCodes.keyEsc) {
      props.onPauseToggle(props.id);
    }
  }

  const initialiseComponent = (): void => {
    if (props.control==="local") {
      document.addEventListener("keydown", handleKeyboard, false);
    }
  }

  const handleDestroyOfComponent = (): void => {
    if (props.control==="local") {
      document.removeEventListener("keydown", handleKeyboard, false);
    }
  }

  useEffect(() => {
    initialiseComponent();
    return handleDestroyOfComponent;
  }, [props]);

  const gridData: GridData = new GridData(
    props.fieldWidth,
    props.fieldHeight
  );

  // to test the stylesheet of game field, fill the field with random puyos
  // const dataArray = gridData.get();
  // for (let i = 0; i < dataArray.length; i++) {
  //   dataArray[i] = _.random(0, props.colourCount);
  // }

  const groupQueueData = new GroupQueueData(props.groupTypeCount, props.colourCount);
  const currentGroupGridData = groupQueueData.pop().gridData;

  const [state, setState] = useState({
    gridData: gridData,
    groupQueueData: groupQueueData,
    currentGroupGridData: currentGroupGridData,
    groupX: 0,
    groupY: 0,
  });

  return (
    <div className={"player player" + props.id}>
      <GroupQueue
        groupQueueData={state.groupQueueData}
      />
      <div className="field">
        <Garbage/>
        <Grid data={state.gridData} >
          <GroupBeingPlayed x={2} y={0} isPaused={props.isPaused} control={props.control} >
            <Group gridData={state.currentGroupGridData}/>
          </GroupBeingPlayed>
        </Grid>
      </div>
    </div>
  );
}

export default Player;
