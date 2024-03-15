import { useParams } from "react-router-dom";
import { API_ROOT } from "./constants";
import NavBar from "./components/NavBar";
import { RoomInfo } from "./types";
import WaitingRoom from "./components/WaitingRoom";

type RoomProps = {
  roomInfo: RoomInfo;
};

const Room = ({ roomInfo }: RoomProps) => {
  const { roomId } = useParams();

  const { user, roomName, host, gameStarted } = roomInfo;

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

  const screenText = () => {};

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
      <div>THIS IS ROOM</div>
      {waitingText()}
    </div>
  );
};

export default Room;
