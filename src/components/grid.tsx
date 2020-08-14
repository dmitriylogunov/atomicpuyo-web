import React from 'react';
import Puyo from './puyo';
import Grid_data, {emptyCell} from "../classes/grid_data";
import classNames from "classnames";

interface GridProps {
  data: Grid_data,
  children?: React.ReactNode,
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
      <div key={index} className={className}>{puyo}</div>
    );
  });

  return (
    <div className="grid">
      {grid}
      {props.children}
    </div>
  )
}

export default Grid;

