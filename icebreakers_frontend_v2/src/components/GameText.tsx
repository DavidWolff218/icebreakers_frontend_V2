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
      <>
      <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
        {/* this placement to be changed later ^^^^ */}
        {/* Next up: {gameRound.nextPlayer.username} */}
        <div className='flex flex-col items-center justify-evenly w-[328px] h-[167px] bg-white rounded-2xl'>
        <h2 className='text-xl leading-6'>{gameRound.currentPlayer.username}, {gameRound.currentQuestion.content}</h2>
        {playerButton()}
        </div>
        </div>
      </>
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
