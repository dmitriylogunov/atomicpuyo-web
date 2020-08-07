import React, {Context, KeyboardEvent, useState} from 'react';
import Player from './player';
import './../styles/game.scss';
import Gamecontrols from "./gamecontrols";

interface GameProps {
  colorCount: number,
  groupTypeCount: number,
  fieldWidth: number,
  fieldHeight: number
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

export let GameContext: Context<GameProps>;

class Game extends React.Component<GameProps, GameState> {
  constructor(props: GameProps) {
    super(props);

    GameContext = React.createContext({
       ...props
    });

    this.handlePauseToggle = this.handlePauseToggle.bind(this);
    this.handleGarbage = this.handleGarbage.bind(this);

    const playersData: Array<PlayerData> = [
      {
        id: 1,
        name: "Ann"
      },
      // {
      //   id: 2,
      //   name: "Joe"
      // }
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
          onPauseToggle={this.handlePauseToggle}
          onGarbageGenerated={this.handleGarbage}
        />
      )
    });

    return (
      <GameContext.Provider value={
        {
          ...this.props,
        }
      }
      >
        <div className="game" style={{height: '100vh', width: '100vw'}}>
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
