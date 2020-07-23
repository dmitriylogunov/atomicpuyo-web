import React from "react";

interface GameControlsProps {
  onPause: any,
  onResume: any
}

class Gamecontrols extends React.Component<GameControlsProps,{}> {
  render(): JSX.Element {
    return (
      <div>
        <button className="pause">Pause</button>
        <button className="resume">Resume</button>
      </div>
    );
  }
}

export default Gamecontrols;