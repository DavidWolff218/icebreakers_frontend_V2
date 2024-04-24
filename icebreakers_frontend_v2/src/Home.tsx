import { useState } from "react";
import CreateRoom from "./components/CreateRoom";
import JoinRoom from "./components/JoinRoom";
import { RoomData, User } from "./types/types";

type HomeProps = {
  handleRoomData: (room: RoomData, user: User) => void;
}

const Home = ({handleRoomData}: HomeProps) => {

  const [showJoin, setShowJoin] = useState(true);

  const handleClick = (bool: boolean) => {
    setShowJoin(bool)
  }

  const renderBtns = (): JSX.Element => {
    return (
      <div>
        <button onClick={() => handleClick(true)}>Join Room</button>
        <button onClick={() => handleClick(false)}>Create Room</button>
      </div>
    );
  };

  return (
    <div>
      <>THIS IS THE HOME PAGE</>
      {renderBtns()}
      {showJoin ? <JoinRoom handleRoomData={handleRoomData}/> : <CreateRoom handleRoomData={handleRoomData}/>}
    </div>
  );
};

export default Home;
