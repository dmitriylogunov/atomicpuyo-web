import React, {KeyboardEvent, useState} from 'react';
import Player, {CallbackData} from './player';
import './../styles/game.scss';
import Gamecontrols from "./gamecontrols";

const gameContextDefaults = {
  colorCount: 4,
  groupTypeCount: 4,
  fieldWidth: 6,
  fieldHeight: 12
}

export const GameContext = React.createContext({
  ...gameContextDefaults,
});

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

interface GameProps {
}

const Game = (props: GameProps): JSX.Element => {

  const handlePause = (data: CallbackData) => { alert("Game paused by the player") };

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

  const [state, setState] = useState({
    playersData: playersData,
    actionQueue: actionQueue,
  });

  const players = state.playersData.map((player) => {
    return (
      <Player
        key={player.id}
        id={player.id}
        name={player.name}
        onPause={handlePause}
        // onGarbageGenerated=this.handleNewGarbage()
      />
    )
  });

  return (
    <GameContext.Provider value={
      {
        ...gameContextDefaults,
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

export default Game;
