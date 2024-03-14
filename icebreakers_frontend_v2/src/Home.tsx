import { useState } from "react";
import CreateRoom from "./components/CreateRoom";
import JoinRoom from "./components/JoinRoom";
import { RoomData, UserData } from "./types";

interface HomeProps {
  handleRoomData: (room: RoomData, user: UserData) => void;
}

const Home: React.FC<HomeProps> = ({handleRoomData}) => {

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
