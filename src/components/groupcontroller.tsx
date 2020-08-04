import React, {useContext, useReducer, useRef} from "react";
import Group from "./group";

const cellToPixelRatio = 16;

interface GroupControllerProps {
  groupType: number
  x: number,
  y: number;
}

interface GroupControllerState {
  group: JSX.Element,
  x: number,
  y: number,
}

type Action =
  | {"type": "update_coordinates", x: number, y: number};

function reducer(currentState: GroupControllerState, action: Action) {
  switch (action.type) {
    case "update_coordinates":
      return {...currentState, x: action.x, y: action.y}
  }
}

const GroupController = (props: GroupControllerProps) => {
  const [state, updateState] = useReducer(reducer, {
    group: <Group
      groupType = {props.groupType}
    />,
    x: props.x * cellToPixelRatio,
    y: props.y * cellToPixelRatio,
  });

  const groupWrapperDiv = useRef<HTMLDivElement>(null);

  return (<div ref={groupWrapperDiv}>
    {state.group}
  </div>)
}

export default GroupController;