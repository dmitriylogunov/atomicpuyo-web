import React, {RefObject, useRef} from "react";
import Group, {GroupElement} from "./group";

const cellToPixelRatio = 16;

interface GroupControllerProps {
  groupType: number
  x: number,
  y: number;
}

interface GroupControllerState {
  x: number,
  y: number,
}

class GroupController extends React.Component<GroupControllerProps, GroupControllerState> {
  private readonly groupRef: RefObject<GroupElement>;

  constructor(props: GroupControllerProps) {
    super(props);

    this.groupRef = React.createRef<GroupElement>();

    this.state = {
      x: props.x * cellToPixelRatio,
      y: props.y * cellToPixelRatio
    }
  }

  render() {
    return (
      <Group
        ref = {this.groupRef}
        groupType={0}
      />
    )
    // handleKeyDown: {(key: number)=>debugger })

    // return (<div ref={groupWrapperDiv}>
    //   {groupComponent}
    // </div>)
  }
}

export default GroupController;