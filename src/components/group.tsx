import React, {RefObject} from "react";
import Grid from "./grid";
import _ from "lodash";
import GridData, {emptyCell} from "../classes/grid_data";

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

export interface GroupProps {
  gridData: GridData;
}

export interface GroupState {
  currentRotation: number
}

export type GroupElement = HTMLDivElement;

class Group extends React.Component<GroupProps, GroupState> {
  private readonly ref: RefObject<GroupElement>;
  private readonly rotations: Array<GridData>;

  constructor(props: GroupProps) {
    super(props)

    this.ref = React.createRef<GroupElement>();

    this.rotations = this.getRotations(props.gridData);

    this.state = {
      currentRotation: 0
    };
  }

  private readonly getRotations = (gridData: GridData) => {
    // TODO rotate
    return new Array<GridData>(4).fill(gridData);
  }

  public rotateCW(): void {
    const newRotation: number =
      (this.state.currentRotation<3)
        ? this.state.currentRotation + 1
        : 0;

    this.setState(
      {
        currentRotation: newRotation
      }
    )
  }

  public rotateCCW(): void {
    const newRotation: number =
      (this.state.currentRotation>0)
        ? this.state.currentRotation - 1
        : 3;

    this.setState(
      {
        currentRotation: newRotation
      }
    )
  }

  render(): JSX.Element {
    const className = "group";
    const gridData = this.rotations[this.state.currentRotation];

    return (
      <div ref={this.ref} className={className}>
        <Grid
          data={gridData}
        />
      </div>
    );
  };
}

export default Group;