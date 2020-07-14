import React from 'react';
import Puyo from './puyo';

type Line<T> = Array<T>;
type Grid = Array<Line<number>>;

class GridComponent extends React.Component< {}, { grid: Grid }> {
  private readonly gridWidth: number = 6;
  private readonly gridHeight: number = 12;

  private readonly invalidCell: number = -1;
  private readonly emptyCell: number = 0;

  constructor(props: object) {
  super(props);

    let grid: Grid = new Array<Line<number>>(this.gridHeight);
    let line: Line<number> = Array<number>(this.gridWidth).fill(this.emptyCell);

    grid.fill(line.slice());

    // for debugging layout
    for (let i=0;i<this.gridHeight;i++) {
      for (let j=0;j<this.gridWidth;j++) {
        grid[i][j] = Math.floor(Math.random() * 6);
      }
    }

    this.state = {
      grid: grid
    }
  }

  private getCell(y: number, x:number): number {
    return (x>=0 && y>=0 && x<this.gridWidth && y<this.gridHeight)
        ? this.state.grid[y][x]
        : this.invalidCell
  }

  render(): JSX.Element {
    const grid = this.state.grid.map((line, y) => {
      return line.map((cell, x) => {
        const puyo = (cell!=this.emptyCell)
            ? <Puyo
                type={cell}
                top={this.getCell(y-1, x)}
                bottom={this.getCell(y+1, x)}
                left={this.getCell(y, x-1)}
                right={this.getCell(y, x+1)}
            />
            : ''

        return (
            <li key={y*this.gridWidth + x} className="cell">{puyo}</li>
        );
      });
    });

    return(
      <ol className="grid">
        {grid}
      </ol>
    )
  }
}

export default GridComponent;
