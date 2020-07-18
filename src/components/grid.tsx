import React from 'react';
import Puyo from './puyo';

type GridData = Array<number>;

class Grid extends React.Component<{}, { grid: GridData }> {
  private readonly gridWidth: number = 6;
  private readonly gridHeight: number = 12;

  private readonly invalidCell: number = -1;
  private readonly emptyCell: number = 0;

  constructor(props: object) {
    super(props);

    let grid: GridData = new Array<number>(this.gridHeight * this.gridWidth).fill(this.emptyCell);

    // for debugging layout
    // for (let i = 0; i < grid.length; i++) {
    //   grid[i] = Math.floor(Math.random() * 6);
    // }

    this.state = {
      grid: grid
    }
  }

  private getCellToTop(index: number): number {
    return this.getCell(index - this.gridWidth);
  }

  private getCellToBottom(index: number): number {
    return this.getCell(index + this.gridWidth);
  }

  private getCellToLeft(index: number): number {
    let isLeftmostCell = index % this.gridWidth == 0;

    return (isLeftmostCell)
      ? this.invalidCell
      : this.getCell(index - 1);
  }

  private getCellToRight(index: number): number {
    let isRightmostCell = index % this.gridWidth == this.gridWidth - 1;

    return (isRightmostCell)
      ? this.invalidCell
      : this.getCell(index + 1);
  }

  private getCell(index: number): number {
    return (index >= 0 && index < this.state.grid.length)
      ? this.state.grid[index]
      : this.invalidCell
  }

  render(): JSX.Element {
    const grid = this.state.grid.map((type, index) => {
      const puyo = (type == this.emptyCell)
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
        + ' cell-' + ((type == this.emptyCell) ? 'empty' : 'withpuyo type' + type.toString());

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
