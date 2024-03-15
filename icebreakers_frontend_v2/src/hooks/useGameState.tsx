import { useState } from "react";
import { GameRound } from "../types";
const UseGameState = () => {

  const handleRecieved = (resp: any) => {
    console.log("hello from handleReceived")
    console.log(resp)
  }

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
  return { gameRound, setGameRound, handleRecieved };
};

export default UseGameState;
