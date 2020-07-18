import React from 'react';

type BlockDefinition =Array<{
  y: number,
  x: number,
}>;

type GroupDefinition = {
  size: number,
  puyos: Array<number>,
  rotations: Array<BlockDefinition>
};

class Group extends React.Component<{type: number}, {isActive: boolean}> {
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
  public readonly typeIBlock = 0;
  public readonly typeLBlock = 0;
  public readonly typeIIBlock = 0;
  public readonly typeOBlock = 0;

  private readonly groups: Array<GroupDefinition> = [
    [
      {
        y: 0,
        x: 0,
      },
      {
        y:
      }
    ]
  ]

  public activate(y: number, x: number) {

  }



  private groupData: Array<GroupDefinition> | undefined;

  constructor(props)
  {
    super(props);



    this.setstate(
      type.
    )
  }
}

export default Group;