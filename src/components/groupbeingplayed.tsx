import React from "react";
import classNames from "classnames";

const cellToPixelRatio = 16;

interface GroupControllerProps {
  x: number,
  y: number;
}

interface GroupControllerState {
  x: number,
  y: number,
}

class GroupBeingPlayed extends React.Component<GroupControllerProps, GroupControllerState> {
  constructor(props: GroupControllerProps) {
    super(props);

    this.state = {
      x: props.x * cellToPixelRatio,
      y: props.y * cellToPixelRatio
    }
  }

  render() {
    const style = {
      "animationDuration": "0.75s"
    };

    const className=classNames({
      'animatedGroup': true
    });

    return (
      <div className={"animated-group"} style={style}>
        {this.props.children}
      </div>
    )
    // handleKeyDown: {(key: number)=>debugger })

    // return (<div ref={groupWrapperDiv}>
    //   {groupComponent}
    // </div>)
  }
}

export default GroupBeingPlayed;