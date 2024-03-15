import { useParams } from "react-router-dom";
import { API_ROOT } from "./constants";
import NavBar from "./components/NavBar";
import { RoomInfo } from "./types";
import WaitingRoom from "./components/WaitingRoom";

type RoomProps = {
  roomInfo: RoomInfo
}

const Room = ({roomInfo}: RoomProps) => {
  const { roomId } = useParams();

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

  };

  return (
    <div>
      <NavBar />
      <div>THIS IS ROOM</div>
    </div>
  );
};

export default Room;
