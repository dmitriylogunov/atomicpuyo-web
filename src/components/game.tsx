import React, {useState, useEffect}  from 'react';
import Player from './player';
import './../styles/game.scss';

class Game extends React.Component<{},{}> {
  // @ts-ignore
  private gameCycleInterval: NodeJS.Timeout
  private players: Array<Player> = [];

  componentDidMount() {
    this.handleInitialise();
    this.handleComponentUpdate();
  }

  componentDidUpdate() {
    this.handleComponentUpdate();
  }

  componentWillUnmount() {
    this.handleCloseOfApplication();
  }

  private handleInitialise() {
    this.gameCycleInterval = setInterval(this.handleGameCycle, 1000);


  }

  private handleGameCycle(): void {

  }

  private handleComponentUpdate(): void {
    // e.g. document.title = `${this.state.player1Score}`;
  }

  private handleCloseOfApplication() {
    clearInterval(this.gameCycleInterval);
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
