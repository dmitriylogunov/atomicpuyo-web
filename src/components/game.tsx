import React from 'react';
import GameControls from "./game_controls";
import Player from "./player";
import './../styles/game.scss';

interface GameProps {
}

type PlayerData = {
  id: number;
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

interface GameState {
  playersData: Array<PlayerData>;
  actionQueue: Array<ActionEvent>;
}

class Game extends React.Component<GameProps, GameState> {
  constructor(props: GameProps) {
    super(props);

    this.handlePauseToggle = this.handlePauseToggle.bind(this);
    this.handleGarbage = this.handleGarbage.bind(this);

    const playersData: Array<PlayerData> = [
      {
        id: 1,
        name: "Ann"
      },
      {
        id: 2,
        name: "Joe"
      }
    ];

    const actionQueue = Array<ActionEvent>(0);

    this.state = {
      playersData: playersData,
      actionQueue: actionQueue,
    }
  }

  private handlePauseToggle(playerId: number): void {
    alert("Game paused by the player" + playerId)
  };

  private handleGarbage(playerId: number, garbageCount: number): void {
    alert("Garbage incoming from " + playerId + " (" + garbageCount + "items)");
  };

  render() {
    const players = this.state.playersData.map((player) => {
      return (
        <Player
          key={player.id}
          id={player.id}

          name={player.name}

          fieldWidth={6}
          fieldHeight={12}
          groupTypeCount={4}
          colourCount={5}

          onPauseToggle={this.handlePauseToggle}
          onGarbageGenerated={this.handleGarbage}
        />
      )
    });

    return (
        <div className="game" style={{height: '100vh', width: '100vw'}}>
          {players}
          <GameControls
            onResume={()=>alert("resume")}
            onPause={()=>alert("pause")}
          />
        </div>
    )
  }
}

export default Game;
