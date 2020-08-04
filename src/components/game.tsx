import React from 'react';
import Player from './player';
import './../styles/game.scss';
import Gamecontrols from "./gamecontrols";

export const GameContext = React.createContext({
  colorCount: 4,
  groupTypeCount: 4,
  fieldWidth: 6,
  fieldHeight: 12,
});

interface GameProps {
}

type PlayerData = {
  id: string;
  name: string;
}

interface GameState {
  playersData: Array<PlayerData>;
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

    this.state = {
      playersData: [
        {
          id: "1",
          name: "Ann"
        },
        {
          id: "2",
          name: "Joe"
        }
      ]
    }
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
          colorCount: 4,
          groupTypeCount: 4,
          fieldWidth: 6,
          fieldHeight: 12
        }
      }
      >
        <div className="game">
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
