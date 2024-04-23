import { useState } from "react";
import { GameRound } from "../types/types";

const UseGameState = () => {
  
  const [hostEnd, setHostEnd] = useState(false);

  const [gameRound, setGameRound] = useState<GameRound>({
    currentPlayer: "",
    currentPlayerID: 0,
    nextPlayer: {id: 0, userName: ""},
    currentQuestion: { id: 0, content: "" },
    reshufflingUsers: false,
    reshufflingQuestions: false,
    allUsers: [],
    gameActive: false,
    // votingQuestionA: "",
    // votingQuestionB: "",
    //   timerRunning: false,
    //   timerSeconds: 5,
    //   timerIntervalID: "",
    // ^^ to be used for voting feature
  });

  const handleReceived = (resp: any) => {
    if (resp.endGame) {
      //this resp only exists when the host ends game
      setHostEnd(true);
    } else if (resp.room && resp.room.game_started && resp.currentQuestion) {
      console.log("resp", resp)
      //for use when game has started and players is active in game, resp.currentQuestion filters out players joining midgame
      setGameRound({
        currentPlayer: resp.currentPlayer.username,
        currentPlayerID: resp.currentPlayer.id,
        nextPlayer: resp.nextPlayer,
        currentQuestion: resp.currentQuestion,
        reshufflingUsers: resp.reshufflingUsers,
        reshufflingQuestions: resp.reshufflingQuestions,
        allUsers: resp.allUsers,
        gameActive: resp.room.game_started,
        // add voting timer stuff here
      });
    } else if (resp.room && !resp.room.game_started) {
      //used for updating lobby of users as new ones come in
      setGameRound((prevState) => ({
        ...prevState,
        allUsers: resp.allUsers,
      }));
    }
  };

  const resetUsersShuffle = () => {
    setGameRound((prevState) => ({
      ...prevState,
      reshufflingUsers: false,
    }));
  };

  const resetQuestionsShuffle = () => {
    setGameRound((prevState) => ({
      ...prevState,
      reshufflingQuestions: false,
    }));
  };

  const resetUsersAndQuestionsShuffle = () => {
    setGameRound((prevState) => ({
      ...prevState,
      reshufflingQuestions: false,
      reshufflingUsers: false,
    }));
  };

  return {
    gameRound,
    setGameRound,
    handleReceived,
    hostEnd,
    resetQuestionsShuffle,
    resetUsersShuffle,
    resetUsersAndQuestionsShuffle,
  };
};

export default UseGameState;
