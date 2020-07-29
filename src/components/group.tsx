import React from "react";
import Grid, {GridData, emptyCell, invalidCell} from "./grid";
import _ from "lodash";

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

export const maxBlockTypeCount = 4;

const gridWidth = 3;
const gridHeight = 3;

const cellToGroupDimensionRatio = 16;

interface GroupProps {
  x: number;
  y: number;
  colorsCount: number;
  groupType: number;
  isVisible: boolean;
}

interface GroupState {
  data: GridData
}

class Group extends React.Component<GroupProps, GroupState> {
  private static readonly blockWidth: number = 3;
  private static readonly blockHeight: number = 3;

  constructor(props: GroupProps) {
    super(props);

    const data = Group.getGroupData(
      props.colorsCount,
      props.groupType
    );

    this.state =
    {
      data: data
    }
  }

  private static getGroupData(numberOfColors: number, blockType: number): Array<number> {
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

  public rotateCW(): void {
    return;
  }

  public rotateCCW(): void {
    return;
  }

  private pixelToGridCoordinate(pixelCoordinate: number) {
    return Math.floor(pixelCoordinate/cellToGroupDimensionRatio);
  }

  render(): JSX.Element {
    const className = "group" + ((this.props.isVisible)?" group-visible":" group-hidden");

    const groupData = this.state.data;

    return(
      <div className={className}>
        <Grid
          width={gridWidth}
          height={gridHeight}
          data={groupData}
        />
      </div>
    )
  }
}

export default Group;