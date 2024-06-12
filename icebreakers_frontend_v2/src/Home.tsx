import { useState } from "react";
import CreateRoom from "./components/CreateRoom";
import JoinRoom from "./components/JoinRoom";
import { RoomData, User } from "./types/types";
import HowToButton from "./components/HowToButton";



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
      <div className='flex justify-evenly mt-3'>
        <h1 className={`font-semibold text-xl w-[120px] ${showJoin ? 'text-apricot border-b-4 border-current' : 'text-black'}`} onClick={() => handleClick(true)}>Join Room</h1>
        <h1 className={`font-semibold text-xl w-[137px] ${!showJoin ? 'text-apricot border-b-4 border-current' : 'text-black'}`} onClick={() => handleClick(false)}>Create Room</h1>
      </div>
    );
  };
  // <h1 className='font-semibold text-xl underline decoration-3 decoration-apricot underline-offset-4' onClick={() => handleClick(false)}>Create Room</h1>

  return (
   <>
    <div className='flex justify-center items-center min-h-screen'>
      <div className='bg-white w-[328px] h-[283px] rounded-2xl flex flex-col shadow'>
        {renderBtns()}
        {showJoin ? <JoinRoom handleRoomData={handleRoomData}/> : <CreateRoom handleRoomData={handleRoomData}/>}
      </div>
      < HowToButton />
   </div>
   </>
  );
};

export default Home;
