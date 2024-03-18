import UseGameState from "../hooks/useGameState";
import { GameRound } from "../types";

type GameTextProps = {
  gameRound: GameRound;
};

const GameText = ({ gameRound }: GameTextProps) => {
  return (
    <>
      <div>
        {gameRound.currentPlayer}
        <br></br>
        {gameRound.currentQuestion.content}
      </div>
    </>
  );
};

export default GameText;
