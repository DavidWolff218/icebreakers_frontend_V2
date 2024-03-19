import { ReactNode } from "react";
import { GameRound } from "../types";

type GameTextProps = {
  gameRound: GameRound;
  playerButton: () => ReactNode
};

const GameText = ({ gameRound, playerButton }: GameTextProps) => {
  return (
    <>
      <div>
        {gameRound.currentPlayer}
        <br></br>
        {gameRound.currentQuestion.content}
        <br></br>
        {playerButton()}
      </div>
    </>
  );
};

export default GameText;
