import { ReactNode } from "react";
import { GameRound, User } from "../types/types";

type GameTextProps = {
  gameRound: GameRound;
  resetQuestionsShuffle: ResetFunction;
  handleNextClick: () => Promise<void>;
  user: User;
  host: User;
};

type ResetFunction = () => void;

const GameText = ({
  gameRound,
  resetQuestionsShuffle,
  handleNextClick,
  user,
  host
}: GameTextProps) => {


  const playerButton = () => {
    if (gameRound.currentPlayer.id === user.id || user.id === host.id) {
      return <button className='w-[222px] h-[34px] bg-apricot rounded-[32px] shadow' onClick={handleNextClick}>NEXT QUESTION</button>;
    } else {
      return null;
    }
  };

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
