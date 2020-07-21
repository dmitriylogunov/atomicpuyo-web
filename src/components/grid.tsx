import React from 'react';
import Puyo from './puyo';
import GroupData from "../classes/groupdata";
import CSS from 'csstype';
import {GamePixel, getGridValueOfGamePixel} from "../classes/gamepixel";
import BlockData from "../classes/blockdata";

type GridProps = {
  gridData: GroupData,
  linkedBlock?: BlockData,
  blockXPix?: number,
  blockYPix?: number
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

    const blockStyles: CSS.Properties = (this.props.linkedBlock && this.props.blockXPix && this.props.blockYPix)
      ?
      {
        top: getGridValueOfGamePixel(this.props.blockXPix).toString() + "px",
        left: getGridValueOfGamePixel(this.props.blockYPix).toString() + "px",
      }
      :
      {}

    const block = (this.props.linkedBlock)
      ?
        <div style={blockStyles} className="block">
          <Grid gridData={this.props.linkedBlock.getGrid()} />
        </div>

      :
      '';

    return (
      <ol className="grid">
        {block}
        {grid}
      </ol>
    )
  }
}

export default Grid;

