import React from "react";

// TODO extract out of class
const sizeOfCellInEm = 3;
const secondsPerCell = 0.75;

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
      x: props.x,
      y: props.y
    }
  }

  render() {
    const style = {
      "animationDuration": secondsPerCell + "s",
      "top": this.state.y*sizeOfCellInEm + "em",
      "left": this.state.x*sizeOfCellInEm + "em",
    };

    return (
      <div className={"animated-group"} style={style}>
        {this.props.children}
      </div>
    )
  }
}

export default GroupBeingPlayed;