export const invalidCell: number = -1;
export const emptyCell: number = 0;

class GridData {
  private data: Array<number>;
  private width: number;
  private height: number;

  constructor(width: number, height: number, data?: Array<number>) {
    if (data) {
      this.data = data.slice();
    } else {
      this.data = new Array<number>(width*height).fill(emptyCell);
    }
    this.width = width;
    this.height = height;
  }

  public get(): Array<number> {
    return this.data;
  }

  public set(data: Array<number>, width: number) {
    this.data = data.slice();
    this.width = width;
  }

  public getCell(index: number): number {
    return (index >= 0 && index < this.data.length)
      ? this.data[index]
      : invalidCell
  }

  public getCellToTop(index: number): number {
    return this.getCell(index - this.width);
  }

  public getCellToBottom(index: number): number {
    return this.getCell(index + this.width);
  }

  public getCellToLeft(index: number): number {
    let isLeftmostCell = index % this.width == 0;

    return (isLeftmostCell)
      ? invalidCell
      : this.getCell(index - 1);
  }

  public getCellToRight(index: number): number {
    let isRightmostCell = index % this.width == this.width - 1;

    return (isRightmostCell)
      ? invalidCell
      : this.getCell(index + 1);
  }

  // TODO use or delete these functions

  // public setCell(index: number, newCell: number): number {
  //   if (index >= 0 && index < this.data.length) {
  //     this.data[index] = newCell
  //     return newCell;
  //   } else {
  //     this.data[index] = GroupData.invalidCell
  //     return GroupData.invalidCell;
  //   }
  // }


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

  // public isOverlap(x: number, y: number, parentGrid: GroupData): boolean {
  //   // TODO
  //   let isOverlap: boolean = false;
  //
  //   return isOverlap;
  // }

  // public getProjection(x: number, y: number, parentGrid: GroupData): Projection {
  //   // TODO return projection of block onto
  //   let projection: Projection = Array(0);
  //
  //   return projection;
  // }


}

export default GridData