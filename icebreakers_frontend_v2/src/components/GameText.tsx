import { ReactNode } from "react";
import { GameRound } from "../types/types";

type GameTextProps = {
  gameRound: GameRound;
  playerButton: () => ReactNode;
  resetQuestionsShuffle: ResetFunction;
};

type ResetFunction = () => void;

const GameText = ({
  gameRound,
  playerButton,

  resetQuestionsShuffle,
}: GameTextProps) => {
  const renderGameText = (): JSX.Element => {
    return (
      <div>
        Next up: {gameRound.nextPlayer.username}
        <br></br>
        <h3>{gameRound.currentPlayer.username}</h3>
        <h3>{gameRound.currentQuestion.content}</h3>
        <br></br>
        {playerButton()}
      </div>
    );
  };

  const loadingGameText = (): JSX.Element => {
    if (gameRound.reshufflingQuestions) {
      setTimeout(resetQuestionsShuffle, 2000);
      return <div>Reshuffling Questions</div>;
    } else {
      return renderGameText();
    }
  };

  return (
    <>
      <div>{loadingGameText()}</div>
    </>
  );
};

export default GameText;
