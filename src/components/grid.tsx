import React from 'react';
import Puyo from './puyo';
import GroupData from "../classes/groupdata";

export type LinkedBlock = {
  xFloat: number,
  yFloat: number,
  group: GroupData
}

type GridProps = {
  gridData: GroupData,
  blockData: LinkedBlock | undefined
};

type GridState = {
};

class Grid extends React.Component<GridProps, GridState> {
  render(): JSX.Element {
    const grid = this.props.gridData.data.map((type, index) => {
      const puyo = (type == GroupData.emptyCell)
        ? ''
        : <Puyo
          type={type}
          connectTop={type == this.props.gridData.getCellToTop(index)}
          connectBottom={type == this.props.gridData.getCellToBottom(index)}
          connectLeft={type == this.props.gridData.getCellToLeft(index)}
          connectRight={type == this.props.gridData.getCellToRight(index)}
        />

      let className
        = 'cell'
        + ' cell-' + ((type == GroupData.emptyCell) ? 'empty' : 'withpuyo type' + type.toString());

      return (
        <li key={index} className={className}>{puyo}</li>
      );
    });

    const linkedGroup =
      <div>TEST</div>;

    return (
      <ol className="grid">
        {linkedGroup}
        {grid}
      </ol>
    )
  }
}

export default Grid;

