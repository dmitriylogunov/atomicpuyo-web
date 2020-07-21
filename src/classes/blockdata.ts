import GroupData from "./groupdata";
import _ from "lodash";

class BlockData {
  private data: GroupData;

  public static readonly typeIBlock = 0;
  public static readonly typeLBlock = 1;
  public static readonly typeIIBlock = 2;
  public static readonly typeOBlock = 3;

  public static readonly maxBlockTypeCount = 4;

  private readonly blockWidth: number = 3;
  private readonly blockHeight: number = 3;

  constructor(numberOfColors: number,  blockTypeCount?: number) {
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


    let blockTypeCount0: number = blockTypeCount ? blockTypeCount : BlockData.maxBlockTypeCount;
    let data: Array<number> = this.getBlockGrid(numberOfColors, _.random(0, blockTypeCount0 - 1));

    this.data = new GroupData(
      this.blockWidth,
      this.blockHeight,
      data
    );
  }

  private getBlockGrid(numberOfColors: number, blockType: number): Array<number> {
    let emptyCell: number = GroupData.emptyCell;

    switch (blockType) {
      case BlockData.typeIBlock: {
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
      case BlockData.typeLBlock: {
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
      case BlockData.typeIIBlock: {
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
      case BlockData.typeOBlock: {
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

  public getGrid(): GroupData {
    return this.data;
  }

  public rotateCW(): void {
    return;
  }

  public rotateCCW(): void {
    return;
  }
}

export default BlockData;