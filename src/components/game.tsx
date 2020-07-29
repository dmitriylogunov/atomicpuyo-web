import React from 'react';
import Player from './player';
import './../styles/game.scss';
import Gamecontrols from "./gamecontrols";

interface GameProps {
  timerFrequency?: number
}

class Game extends React.Component<GameProps,{}> {
  private players: Array<Player> = [];

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
    }
  }

  render(): JSX.Element {
    interface PlayerData {
      id: string;
      name: string;
    }

    const playerData: Array<PlayerData> = [
      {
        id: "1",
        name: "Ann"
      },
      {
        id: "2",
        name: "Joe"
      }
    ]

    const players = playerData.map((player) => {
      return (
        <Player
          key={player.id}
          id={player.id}
          name={player.name}
          fieldWidth={6}
          fieldHeight={12}
          coloursCount={4}
          gameSpeed={2}
          // onGarbageGenerated=this.handleNewGarbage()
        />
      )
    });

    return (
      <div className="game">
        {players}
        <Gamecontrols
          onResume={"A"}
          onPause={"B"}
        />
      </div>
    )
  }
}

export default Game;
