import { useState } from "react";
import { GameRound } from "../types";
const UseGameState = () => {
  
  const [gameRound, setGameRound] = useState<GameRound>({
    currentPlayer: "",
    currentPlayerID: 0,
    currentQuestion: { id: 0, content: ''},
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
  return { gameRound };
};

export default UseGameState;
