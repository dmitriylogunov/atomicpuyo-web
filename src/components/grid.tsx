import React from 'react';
import Puyo from './puyo';

export type GridData = {
  width: number,
  height: number,
  data: Array<number>
};

type GridProps = {
  gridData: GridData
};

type GridState = {
};

class Grid extends React.Component<GridProps, GridState> {

  public static readonly invalidCell: number = -1;
  public static readonly emptyCell: number = 0;

  private getCellToTop(index: number): number {
    return this.getCell(index - this.props.gridData.width);
  }

  private getCellToBottom(index: number): number {
    return this.getCell(index + this.props.gridData.width);
  }

  private getCellToLeft(index: number): number {
    let isLeftmostCell = index % this.props.gridData.width == 0;

    return (isLeftmostCell)
      ? Grid.invalidCell
      : this.getCell(index - 1);
  }

  private getCellToRight(index: number): number {
    let isRightmostCell = index % this.props.gridData.width == this.props.gridData.width - 1;

    return (isRightmostCell)
      ? Grid.invalidCell
      : this.getCell(index + 1);
  }

  private getCell(index: number): number {
    return (index >= 0 && index < this.props.gridData.data.length)
      ? this.props.gridData.data[index]
      : Grid.invalidCell
  }

  render(): JSX.Element {
    const grid = this.props.gridData.data.map((type, index) => {
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

