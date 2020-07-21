import React from 'react';
import Player from './player';
import './../styles/game.scss';

class Game extends React.Component<{},{}> {
  private players: Array<Player> = [];

  componentDidMount() {
    this.handleComponentUpdate();
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


  constructor(props: object) {
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
        <div className={"player player" + player.id}><Player
          key={player.id}
          id={player.id}
          name={player.name}
          fieldWidth={6}
          fieldHeight={12}
          numberOfColors={4}
          // onGarbageGenerated=this.handleNewGarbage()
        /></div>
      )
    });

    return (
      <div className="game">
        {players}
      </div>
    )
  }
}

export default Game;
