export type Projection = Array<{
  y: number,
  x: number,
  color: number,
}>

export class GroupData {
  constructor(width: number, height: number, data: Array<number>) {
    this.width = width;
    this.height = height;
    this.data = data;
  }

  readonly width: number;
  readonly height: number;
  public data: Array<number>;

  public static readonly invalidCell: number = -1;
  public static readonly emptyCell: number = 0;

  public getCellToTop(index: number): number {
    return this.getCell(index - this.width);
  }

  public getCellToBottom(index: number): number {
    return this.getCell(index + this.width);
  }

  public getCellToLeft(index: number): number {
    let isLeftmostCell = index % this.width == 0;

    return (isLeftmostCell)
      ? GroupData.invalidCell
      : this.getCell(index - 1);
  }

  public getCellToRight(index: number): number {
    let isRightmostCell = index % this.width == this.width - 1;

    return (isRightmostCell)
      ? GroupData.invalidCell
      : this.getCell(index + 1);
  }

  public getCell(index: number): number {
    return (index >= 0 && index < this.data.length)
      ? this.data[index]
      : GroupData.invalidCell
  }

  // public setCell(index: number, newCell: number): number {
  //   if (index >= 0 && index < this.data.length) {
  //     this.data[index] = newCell
  //     return newCell;
  //   } else {
  //     this.data[index] = GroupData.invalidCell
  //     return GroupData.invalidCell;
  //   }
  // }

  // TODO - idea - do not merge any grids, just save child grid (optionally) while noting on which lines it is and
  //  simply display it over later


  // TODO merge function for projection, not grid
  // private merge(targetX: number, targetY: number, childGrid: GroupData) {
  //   let x = targetX;
  //   let y = targetY;
  //
  //   let width = childGrid.width;
  //   let height = childGrid.height;
  //
  //   for (let i=0;i<childGrid.data.length;i++) {
  //     if (x>width) {
  //       x = targetX;
  //       y++;
  //     }
  //     if (y>childGrid.height) {
  //       break;
  //     }
  //     if (x>this.width) {
  //       x++;
  //       continue;
  //     }
  //     this.data[x + y * this.width] = childGrid.data[i];
  //   }
  // }

  // public cloneAndMergeWith(...childGrids: {x: number, y: number, gridData: GroupData}[]): GroupData {
  //   let newData = this.data.slice();
  //   for (var i=0; i<childGrids.length; i++) {
  //     let childGrid = childGrids[i];
  //     this.merge(childGrid.x, childGrid.y, childGrid.gridData);
  //   }
  //
  //   return new GroupData(
  //     this.width,
  //     this.height,
  //     newData
  //   )
  // }

  public isOverlap(x: number, y: number, parentGrid: GroupData): boolean {
    // TODO
    let isOverlap: boolean = false;

    return isOverlap;
  }

  public getProjection(x: number, y: number, parentGrid: GroupData): Projection {
    // TODO return projection of block onto
    let projection: Projection = Array(0);

    return projection;
  }
};

export default GroupData;