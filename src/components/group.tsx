import React, {forwardRef, useContext, useState} from "react";
import Grid from "./grid";
import _ from "lodash";
import Grid_data, {emptyCell} from "../classes/grid_data";
import {GameContext} from "./game";

// I-block - two Puyo starting vertically rotate around the lower one. They may be of
// the same or different color.
//
// L-block - three Puyo in an L-shape rotate around the one in the corner. They may
// either all be of the same color, or there will be a vertical same-color pair and
// a single Puyo in a different color on the lower-right.
//
// II-block - four Puyo in a square rotate around the center. The left two Puyo are
// the same color as each other and so are the right two Puyo. The two sides will
// never be the same color as each other.
//
// O-block - four Puyo in a square do not rotate and are all the same color. You
// can change the color by attempting to rotate the Puyo.
export const groupTypeIBlock = 0;
export const groupTypeLBlock = 1;
export const groupTypeIIBlock = 2;
export const groupTypeOBlock = 3;

const groupWidth = 3;
const groupHeight = 3;

export interface GroupProps {
  groupType: number;
}

export interface GroupState {
  rotations: Array<Grid_data>,
  currentRotation: number
}


const getRotations = (data: Grid_data) => {
  // TODO rotate
  return new Array<Grid_data>(4).fill(data);
}

const getGridDataOfGroup = (numberOfColors: number, blockType: number): Array<number> => {
    switch (blockType) {
      case groupTypeIBlock: {
        let color1: number = _.random(1, numberOfColors);
        let color2: number = _.random(1, numberOfColors);
        return ([
          color1, emptyCell, emptyCell,
          color2, emptyCell, emptyCell,
          emptyCell, emptyCell, emptyCell
        ]);
        // return [
        //   {
        //     y: 0,
        //     x: 0,
        //     color: color1,
        //   },
        //   {
        //     y: 1,
        //     x: 0,
        //     color: color2,
        //   },
        // ]
      }
      case groupTypeLBlock: {
        let color1: number = _.random(1, numberOfColors);
        let color2: number = _.random(1, numberOfColors);
        return ([
          color1, emptyCell, emptyCell,
          color2, color2, emptyCell,
          emptyCell, emptyCell, emptyCell
        ]);
        // return [
        //   {
        //     y: 0,
        //     x: 0,
        //     color: color1,
        //   },
        //   {
        //     y: 1,
        //     x: 0,
        //     color: color1,
        //   },
        //   {
        //     y: 1,
        //     x: 1,
        //     color: color2,
        //   },
        // ]
      }
      case groupTypeIIBlock: {
        let color1: number = _.random(0, numberOfColors);
        let color2: number = _.random(0, numberOfColors);
        while (color1 == color2) {
          color2 = _.random(0, numberOfColors);
        }
        return [color1, color2, emptyCell,
          color1, color2, emptyCell,
          emptyCell, emptyCell, emptyCell
        ];
        // return [
        //   {
        //     y: 0,
        //     x: 0,
        //     color: color1,
        //   },
        //   {
        //     y: 1,
        //     x: 0,
        //     color: color1,
        //   },
        //   {
        //     y: 0,
        //     x: 1,
        //     color: color2,
        //   },
        //   {
        //     y: 1,
        //     x: 1,
        //     color: color2,
        //   },
        // ]
      }
      case groupTypeOBlock: {
        let color: number = _.random(0, numberOfColors);
        return [color, color, emptyCell,
          color, color, emptyCell,
          emptyCell, emptyCell, emptyCell
        ];
        // return [
        //   {
        //     y: 0,
        //     x: 0,
        //     color: color,
        //   },
        //   {
        //     y: 1,
        //     x: 0,
        //     color: color,
        //   },
        //   {
        //     y: 0,
        //     x: 1,
        //     color: color,
        //   },
        //   {
        //     y: 1,
        //     x: 1,
        //     color: color,
        //   },
        // ]
      }
      default:
        throw 'Requested block type is out of supported range';
    }
  }

  // const rotateCW(): void {
  //   const newRotation: number =
  //     (this.state.currentRotation<3)
  //       ? this.state.currentRotation + 1
  //       : 0;
  //
  //   this.setState(
  //     {
  //       currentRotation: newRotation
  //     }
  //   )
  // }
  //
  // public rotateCCW(): void {
  //   const newRotation: number =
  //     (this.state.currentRotation>0)
  //       ? this.state.currentRotation - 1
  //       : 3;
  //
  //   this.setState(
  //     {
  //       currentRotation: newRotation
  //     }
  //   )
  // }

export type GroupElement = HTMLDivElement;

const Group = forwardRef<GroupElement, GroupProps>((props, ref): JSX.Element => {
  const context = useContext(GameContext);

  const data: Grid_data = new Grid_data(
    groupWidth,
    groupHeight,
    getGridDataOfGroup(
      context.colorCount,
      props.groupType
    )
  );

  const rotations = getRotations(data);

  const [state, setState] = useState({
    rotations: rotations,
    currentRotation: 0
  });

  const className = "group";
  const groupData = state.rotations[state.currentRotation];

  return (
    <div ref={ref} className={className}>
      <Grid
        data={groupData}
      />
    </div>
  );
});

export default Group;