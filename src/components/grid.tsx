import React, {ReactNodeArray} from 'react';
import Puyo from './puyo';
import Grid_data, {emptyCell} from "../classes/grid_data";
import classNames from "classnames";

interface GridProps {
  data: Grid_data,
  children?: ReactNodeArray
};

const Grid = (props: GridProps): JSX.Element => {
  const data = props.data;

  const grid = data.get().map((type, index) => {
    const puyo = (type === emptyCell)
      ? ''
      : <Puyo
        type={type}
        connectTop={type === data.getCellToTop(index)}
        connectBottom={type === data.getCellToBottom(index)}
        connectLeft={type === data.getCellToLeft(index)}
        connectRight={type === data.getCellToRight(index)}
      />


    const className = classNames({
      'cell': true,
      'cell-empty': type === emptyCell,
    }) + ' type' + type.toString();

    return (
      <li key={index} className={className}>{puyo}</li>
    );
  });

  return (
    <div className="grid">
      <ol className="cells">
        {grid}
      </ol>
      {props.children}
    </div>
  )
}

export default Grid;

