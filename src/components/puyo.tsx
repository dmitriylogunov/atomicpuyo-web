import React from 'react';

function Puyo(props: any): JSX.Element {
  let connectCode: string =
    (props.connectTop ? 'T' : '') +
    (props.connectBottom ? 'B' : '') +
    (props.connectLeft ? 'L' : '') +
    (props.connectRight ? 'R' : '');

  let className: string = 'puyo type' + props.type.toString();

  return (
    <div className={className}>&nbsp;{connectCode}</div>
  );
}

export default Puyo;
