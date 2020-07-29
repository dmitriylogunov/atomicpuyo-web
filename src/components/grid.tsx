import React from 'react';
import Puyo from './puyo';

export type GridData = Array<number>;
export const invalidCell: number = -1;
export const emptyCell: number = 0;

interface GridProps {
  width: number,
  height: number,
  data: GridData,
};

interface GridState {
};

class Grid extends React.Component<GridProps, GridState> {

  constructor(props: GridProps) {
    super(props);
  }



  public getCellToTop(index: number): number {
    return this.getCell(index - this.props.width);
  }

  public getCellToBottom(index: number): number {
    return this.getCell(index + this.props.width);
  }

  public getCellToLeft(index: number): number {
    let isLeftmostCell = index % this.props.width == 0;

    return (isLeftmostCell)
      ? invalidCell
      : this.getCell(index - 1);
  }

  public getCellToRight(index: number): number {
    let isRightmostCell = index % this.props.width == this.props.width - 1;

    return (isRightmostCell)
      ? invalidCell
      : this.getCell(index + 1);
  }

  public getCell(index: number): number {
    return (index >= 0 && index < this.props.data.length)
      ? this.props.data[index]
      : invalidCell
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

  render(): JSX.Element {
    const grid = this.props.data.map((type, index) => {
      const puyo = (type == emptyCell)
        ? ''
        : <Puyo
          type={type}
          connectTop={type == this.getCellToTop(index)}
          connectBottom={type == this.getCellToBottom(index)}
          connectLeft={type == this.getCellToLeft(index)}
          connectRight={type == this.getCellToRight(index)}
        />

      let className
        = 'cell'
        + ' cell-' + ((type == emptyCell) ? 'empty' : 'withpuyo type' + type.toString());

      return (
        <li key={index} className={className}>{puyo}</li>
      );
    });

    return (
      <ol className="grid">
        {grid}
      </ol>
    )
  }
}

export default Grid;

