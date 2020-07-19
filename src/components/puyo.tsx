import React from 'react';

type PuyoProps = {
  type: number,
  connectTop: boolean | undefined,
  connectBottom: boolean | undefined,
  connectLeft: boolean | undefined,
  connectRight: boolean | undefined,
}

function Puyo(props: PuyoProps): JSX.Element {

  let className: string = 'puyo type' + props.type.toString();

  let connectCode: string =
    (props.connectTop ? 'T' : '') +
    (props.connectBottom ? 'B' : '') +
    (props.connectLeft ? 'L' : '') +
    (props.connectRight ? 'R' : '');

  return (
    <div className={className}>&nbsp;{connectCode}</div>
  );
}

export default Puyo;
