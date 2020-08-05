import React, {KeyboardEvent} from 'react';
import Player from './player';
import './../styles/game.scss';
import Gamecontrols from "./gamecontrols";

export type KeyboardCallback = (keyStrokeQueue: KeyboardEvent) => void;
export type KeyboardSubscriber = (callback: KeyboardCallback) => void;

const gameContextDefaults = {
  colorCount: 4,
  groupTypeCount: 4,
  fieldWidth: 6,
  fieldHeight: 12
}

export const GameContext = React.createContext({
  ...gameContextDefaults,
  keyboardSubscribe: (callback: KeyboardCallback) => {},
});


type PlayerData = {
  id: string;
  name: string;
}
type ActionEvent =
  | {
    type: "move",
    xDiff: number,
    yDiff: number
  }
  | {
    type: "garbage",
    count: number;
  };

interface GameProps {
}

interface GameState {
  playersData: Array<PlayerData>,
  keyboardSubscribers: Array<KeyboardCallback>
  actionQueue: Array<ActionEvent>;
}

class Game extends React.Component<GameProps, GameState> {

  componentDidMount() {
    this.handleComponentUpdate();

    // TODO
    // let elementRef = ...;
    // set el height and width etc.
  }

  componentDidUpdate() {
    this.handleComponentUpdate();
  }

  componentWillUnmount() {
    // handle close of application here
  }

  private handleComponentUpdate(): void {
    // e.g. document.title = `${this.state.player1Score}`;
  }

  constructor(props: GameProps) {
    super(props);

    this.handleKeyDown = this.handleKeyDown.bind(this);

    const playersData = [
      {
        id: "1",
        name: "Ann"
      },
      // {
      //   id: "2",
      //   name: "Joe"
      // }
    ];

    const actionQueue = Array<ActionEvent>(0);
    const keyboardSubscribers = Array<KeyboardCallback>(0);

    this.state = {
      playersData: playersData,
      keyboardSubscribers: keyboardSubscribers,
      actionQueue: actionQueue,
    }
  }

  private handleKeyDown = (
    (event: KeyboardEvent<HTMLDivElement>) =>
    {
      event.preventDefault();
      const keyboardSubscribers = this.state.keyboardSubscribers;

      keyboardSubscribers.forEach((subscriber) => {
        subscriber(event);
      })
    }
  )

  private handleKeyboardSubscribe(callback: KeyboardCallback) {
    const keyboardSubscribers = this.state.keyboardSubscribers.slice();
    keyboardSubscribers.push(callback);

    this.setState({
      keyboardSubscribers: keyboardSubscribers
    })
  }

  render(): JSX.Element {
    const players = this.state.playersData.map((player) => {
      return (
        <Player
          key={player.id}
          id={player.id}
          name={player.name}
          // onGarbageGenerated=this.handleNewGarbage()
        />
      )
    });

    return (
      <GameContext.Provider value={
        {
          ...gameContextDefaults,
          keyboardSubscribe: this.handleKeyboardSubscribe
        }
      }
      >
        <div className="game" style={{height: '100vh', width: '100vw'}} onKeyDown={this.handleKeyDown}>
          {players}
          <Gamecontrols
            onResume={"A"}
            onPause={"B"}
          />
        </div>
      </GameContext.Provider>
    )
  }
}

export default Game;
