import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { API_ROOT } from "./constants";
import NavBar from "./components/NavBar";
import { RoomInfo } from "./types";
import WaitingRoom from "./components/WaitingRoom";
import GameText from "./components/GameText";
import UseGameState from "./hooks/useGameState";
// @ts-ignore
import { ActionCableConsumer } from "@thrash-industries/react-actioncable-provider";

type RoomProps = {
  roomInfo: RoomInfo;
};

const Room = ({ roomInfo }: RoomProps) => {
  const { roomId } = useParams();

  const { user, roomName, host, gameStarted } = roomInfo;

  const {
    gameRound,
    setGameRound,
    handleReceived,
    hostEnd,
    // resetUsersAndQuestionsShuffle,
    // resetQuestionsShuffle,
    // resetUsersShuffle,
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
      console.log("game started");
    }
  }, []);

  const handleClick = async () => {
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
      return <button onClick={handleClick}>NEXT QUESTION</button>;
    } else {
      return null;
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
        <GameText gameRound={gameRound} playerButton={playerButton} />
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

  return (
    <div>
      <NavBar />
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
