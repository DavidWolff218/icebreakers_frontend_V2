import { useParams } from "react-router-dom";
import NavBar from "./components/NavBar";

const Room = () => {
  const { roomId } = useParams();

  console.log(roomId);

  return (
    <div>
      <NavBar />
      <div>THIS IS ROOM</div>
    </div>
  );
};

export default Room;
