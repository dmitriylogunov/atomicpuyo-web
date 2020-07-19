import React from 'react';
import Puyo from './puyo';

type GridData = Array<number>;

type GridProps = {
  gridWidth: number,
  gridHeight: number,
};

type GridState = {
  data: GridData
};

class Grid extends React.Component<GridProps, GridState> {

  public static readonly invalidCell: number = -1;
  public static readonly emptyCell: number = 0;

  constructor(props: GridProps) {
    super(props);

    let grid: GridData = new Array<number>(this.props.gridHeight * this.props.gridWidth).fill(Grid.emptyCell);

    // for debugging layout
    // for (let i = 0; i < grid.length; i++) {
    //   grid[i] = Math.floor(Math.random() * 6);
    // }

    this.state = {
      data: grid
    }
  }

  private getCellToTop(index: number): number {
    return this.getCell(index - this.props.gridWidth);
  }

  private getCellToBottom(index: number): number {
    return this.getCell(index + this.props.gridWidth);
  }

  private getCellToLeft(index: number): number {
    let isLeftmostCell = index % this.props.gridWidth == 0;

    return (isLeftmostCell)
      ? Grid.invalidCell
      : this.getCell(index - 1);
  }

  private getCellToRight(index: number): number {
    let isRightmostCell = index % this.props.gridWidth == this.props.gridWidth - 1;

    return (isRightmostCell)
      ? Grid.invalidCell
      : this.getCell(index + 1);
  }

  private getCell(index: number): number {
    return (index >= 0 && index < this.state.data.length)
      ? this.state.data[index]
      : Grid.invalidCell
  }

  render(): JSX.Element {
    const grid = this.state.data.map((type, index) => {
      const puyo = (type == Grid.emptyCell)
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
        + ' cell-' + ((type == Grid.emptyCell) ? 'empty' : 'withpuyo type' + type.toString());

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
