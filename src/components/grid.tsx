import React, {ReactNodeArray} from 'react';
import Puyo from './puyo';
import GridData, {emptyCell} from "../classes/gridData";

interface GridProps {
  data: GridData,
  children?: ReactNodeArray
};

const Grid = (props: GridProps): JSX.Element => {
  const data = props.data;

  const grid = data.get().map((type, index) => {
    const puyo = (type == emptyCell)
      ? ''
      : <Puyo
        type={type}
        connectTop={type == data.getCellToTop(index)}
        connectBottom={type == data.getCellToBottom(index)}
        connectLeft={type == data.getCellToLeft(index)}
        connectRight={type == data.getCellToRight(index)}
      />

    let className
      = 'cell'
      + ' cell-' + ((type == emptyCell) ? 'empty' : 'withpuyo type' + type.toString());

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

