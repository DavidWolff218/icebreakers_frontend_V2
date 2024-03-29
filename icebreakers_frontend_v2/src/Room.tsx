import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { API_ROOT } from "./constants";
import NavBar from "./components/NavBar";
import { RoomInfo } from "./types";
import WaitingRoom from "./components/WaitingRoom";
import GameText from "./components/GameText";
import UseGameState from "./hooks/useGameState";
import EndGameModal from "./modals/endGameModal";
// @ts-ignore
import { ActionCableConsumer } from "@thrash-industries/react-actioncable-provider";

type RoomProps = {
  roomInfo: RoomInfo;
};

const Room = ({ roomInfo }: RoomProps) => {
  const { roomId } = useParams();

  const navigate = useNavigate();

  const { user, roomName, host, gameStarted } = roomInfo;

  const {
    gameRound,
    setGameRound,
    handleReceived,
    hostEnd,
    resetUsersAndQuestionsShuffle,
    resetQuestionsShuffle,
    resetUsersShuffle,
  } = UseGameState();

  useEffect(() => {
    if (!gameStarted) {
      const fetchUsers = async () => {
        try {
          const resp = await fetch(`${API_ROOT}/users/by_room/${roomId}`);
          if (!resp.ok) {
            throw new Error("Could not grab all users");
          } else {
            const data = await resp.json();
            setGameRound((prevState) => ({
              ...prevState,
              allUsers: data.allUsers,
            }));
          }
        } catch (error) {
          alert(error);
        }
      };
      fetchUsers();
    } else {
      const fetchRound = async () => {
        try {
          const resp = await fetch(
            `http://localhost:3000/users/midgame/${roomId}`
          );
          if (!resp.ok) {
            console.log("there was an error");
          }
          const data = await resp.json();
          console.log("here is the data", data);
          console.log("ROOMINFO", roomInfo)
          setGameRound((prevState) => ({
            ...prevState,
            currentPlayer: data.currentPlayer.username,
            currentPlayerID: data.currentPlayer.id,
            currentQuestion: data.currentQuestion,
            // allUsers: data.allUsers,
            gameActive: data.room.game_started
          }))
        } catch (error) {
          console.error(error);
        }
      };
      fetchRound();
    }
  }, []);

  useEffect(() => {
    if (hostEnd) {
      setTimeout(() => {
        sessionStorage.removeItem("token");
        navigate("/", { replace: true });
      }, 5000);
    }
  }, [hostEnd]);

  const handleNextClick = async () => {
    try {
      const reqObj = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: {
            room: roomId,
            currentPlayerID: gameRound.currentPlayerID,
          },
          question: {
            id: gameRound.currentQuestion.id,
          },
        }),
      };
      const resp = await fetch(`${API_ROOT}/users/select`, reqObj);
      if (!resp.ok) {
        console.log("Could no get next question");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const playerButton = () => {
    if (gameRound.currentPlayerID === user.id || user.id === host.id) {
      return <button onClick={handleNextClick}>NEXT QUESTION</button>;
    } else {
      return null;
    }
  };

  const handleLogOut = async () => {
    let id = user.id;
    if (gameRound.currentPlayerID === id) {
      handleNextClick();
    }
    const reqObj = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        user: {
          id: id,
        },
      }),
    };
    try {
      await fetch(`${API_ROOT}/users/${id}`, reqObj);
      sessionStorage.removeItem("token");
      navigate("/", { replace: true });
    } catch (error) {
      console.error(error);
    }
  };

  const handleEndGame = async () => {
    const reqObj = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        room: {
          id: roomId,
        },
      }),
    };
    await fetch(`${API_ROOT}/rooms/${roomId}`, reqObj);
    try {
      sessionStorage.removeItem("token");
      navigate("/", { replace: true });
    } catch (error) {
      console.error(error);
    }
  };

  const handleStartClick = async () => {
    try {
      const reqObj = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: {
            room: roomId,
          },
        }),
      };
      const resp = await fetch(`${API_ROOT}/users/start`, reqObj);
      if (!resp.ok) {
        throw new Error(`HTTP error! Status: ${resp.status}`);
      }
    } catch (error) {
      throw error;
    }
  };

  const screenText = () => {
    //can't get this to work using useGameState and not props
    return (
      <div>
        <GameText
          gameRound={gameRound}
          playerButton={playerButton}
          resetUsersandQuestionsShuffle={resetUsersAndQuestionsShuffle}
          resetQuestionsShuffle={resetQuestionsShuffle}
          resetUsersShuffle={resetUsersShuffle}
        />
      </div>
    );
  };

  const waitingText = () => {
    //***not sure if need this conditional still */
    if (!gameStarted) {
      return (
        <WaitingRoom
          host={host}
          user={user}
          handleStartClick={handleStartClick}
          allUsers={gameRound.allUsers}
        />
      );
    }
    return null;
  };

  console.log("GAMEROUND", gameRound)

  return (
    <div>
      <NavBar
        user={user}
        host={host}
        handleLogOut={handleLogOut}
        handleEndGame={handleEndGame}
        roomName={roomName}
      />
      {hostEnd && <EndGameModal />}
      <ActionCableConsumer
        channel={{
          channel: "UsersChannel",
          room: roomId,
        }}
        onReceived={handleReceived}
      >
        {gameRound.gameActive ? screenText() : waitingText()}
      </ActionCableConsumer>
    </div>
  );
};

export default Room;
