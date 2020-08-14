import React, {RefObject, useEffect, useRef, useState} from "react";

// TODO extract out of class
const sizeOfCellInEm = 3;
const secondsPerCell = 1;

interface GroupControllerProps {
  x: number;
  y: number;
  isPaused: boolean;
  children?: React.ReactNode,
}

interface GroupControllerState {
  x: number;
  y: number;
}

const GroupBeingPlayed = (props: GroupControllerProps) => {
  const groupContainerRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  });

  const y = useY(props);
  const x = useX(props.x);
  const y0 = useRef(y);

  const yHasChanged:boolean = (y!==y0.current);

  if (yHasChanged) {
    y0.current = y;
  }

  const style = {
    "animationDuration": secondsPerCell + "s",
    "top": y * sizeOfCellInEm + "em",
    "left": props.x * sizeOfCellInEm + "em",
    "animationPlayState": props.isPaused ? "paused" : "running",
    "paddingTop": "0px",
  };

  return (
    <div ref={groupContainerRef} className={"animated-group"} style={style}>
      {props.children}
    </div>
  )
}

function useY(props: GroupControllerProps) {
  const [y, setY] = useState(props.y);

  useEffect(() => {
    const advanceGroupOneCell = () => {
      if (props.isPaused) {
        console.log("Paused");
      } else {
        setY(y+1);
        //groupContainerRef.current.style({top: "100px"});
      }
    };

    const timerId = setInterval(advanceGroupOneCell, secondsPerCell*1000);
    return ((): void =>
    {
      clearInterval(timerId);
    })
  });

  return y;
}

function useX(x0: number) {
  const [x, setX] = useState(x0);

  useEffect(() => {

  })

  return x;
}

export default GroupBeingPlayed;