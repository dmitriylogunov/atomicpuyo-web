import React, {KeyboardEvent} from "react";

interface KeyboardInputProps {
  childComponent: any;
}

interface KeyboardInputState {
  keystrokeQueue: Array<KeyboardEvent>;
}

class KeyboardInput extends React.Component<KeyboardInputProps, KeyboardInputState> {
  // constructor(props) {
  //   super(props);
  //
  //   this.handleKeyInput = this.handleKeyInput.bind(this);
  // }

  private handleKeyInput() {
    //const keystrokeQueue = this.state.keystroke
  }
}

export function withKeyboardInput(): any {
  return class extends React.Component<any, any> {
    externalRenderer() {
      return (
        <div />
      )
    }
  }
}

export default KeyboardInput;