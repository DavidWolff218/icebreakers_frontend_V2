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
        <span onClick={() => handleClick(true)}>Join Room</span>
        <span onClick={() => handleClick(false)}>Create Room</span>
      </div>
    );
  };

  return (
   
    <div className="flex justify-center items-center min-h-screen">
      <div className='bg-white w-[328px] h-[283px] rounded-2xl'>
        {renderBtns()}
        {showJoin ? <JoinRoom handleRoomData={handleRoomData}/> : <CreateRoom handleRoomData={handleRoomData}/>}
      </div>
   </div>
  );
};

export default Home;
