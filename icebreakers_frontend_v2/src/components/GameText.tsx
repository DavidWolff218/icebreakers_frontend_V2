import { ReactNode } from "react";
import { GameRound } from "../types/types";

type GameTextProps = {
  gameRound: GameRound;
  playerButton: () => ReactNode;
  resetUsersandQuestionsShuffle: ResetFunction;
  resetQuestionsShuffle: ResetFunction;
  resetUsersShuffle: ResetFunction;
};

type ResetFunction = () => void;

const GameText = ({
  gameRound,
  playerButton,
  resetUsersandQuestionsShuffle,
  resetQuestionsShuffle,
  resetUsersShuffle,
}: GameTextProps) => {
  const renderGameText = (): JSX.Element => {
    return (
      <div>
        {gameRound.currentPlayer}
        <br></br>
        {gameRound.currentQuestion.content}
        <br></br>
        {playerButton()}
      </div>
    );
  };

  const loadingGameText = (): JSX.Element => {
    if (gameRound.reshufflingQuestions && gameRound.reshufflingUsers) {
      setTimeout(resetUsersandQuestionsShuffle, 2000);
      return <div>Reshuffling Users and Questions</div>;
    } else if (gameRound.reshufflingQuestions) {
      setTimeout(resetQuestionsShuffle, 2000);
      return <div>Reshuffling Questions</div>;
    } else if (gameRound.reshufflingUsers) {
      setTimeout(resetUsersShuffle, 2000);
      return <div>Reshuffling Users</div>;
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
