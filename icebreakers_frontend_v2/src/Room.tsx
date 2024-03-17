import { useParams } from "react-router-dom";
import { API_ROOT } from "./constants";
import NavBar from "./components/NavBar";
import { RoomInfo } from "./types";
import WaitingRoom from "./components/WaitingRoom";
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
    // setGameRound,
    handleReceived,
    hostEnd,
    // resetUsersAndQuestionsShuffle,
    // resetQuestionsShuffle,
    // resetUsersShuffle,
  } = UseGameState();

  console.log(
    "Here is my room info in room component",
    user,
    host,
    gameStarted,
    roomName
  );

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
    console.log("game room info", gameRound)
    return (<div>

      "WE MADE IT TO THE GAME"
    </div>)
  };

  const waitingText = () => {
    //***not sure if need this conditional still */
    if (!gameStarted) {
      return (
        <WaitingRoom
          host={host}
          user={user}
          handleStartClick={handleStartClick}
        />
      );
    }
    return null;
    // users={gameRound.allUsers}
  };

  return (
    <div>
      <NavBar />
      <ActionCableConsumer
        channel={{
          channel: "UsersChannel",
          room: roomId
        }}
        onReceived={handleReceived}
      >
        {gameRound.gameActive ? screenText() : waitingText()}
      </ActionCableConsumer>
    </div>
  );
};

export default Room;
