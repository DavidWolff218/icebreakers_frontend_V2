import { useState } from "react";
import CreateRoom from "./components/CreateRoom";
import JoinRoom from "./components/JoinRoom";
import { RoomData, User } from "./types/types";
import HowToButton from "./components/HowToButton";
import NavBarHome from "./components/NavBarHome";
import MenuHome from "./components/MenuHome";
import UpperTextWindow from "./components/UpperTextWindow";

type HomeProps = {
  handleRoomData: (room: RoomData, user: User) => void;
};

const Home = ({ handleRoomData }: HomeProps) => {
  const [showJoin, setShowJoin] = useState(true);

  const [showMenu, setShowMenu] = useState(false);

  const handleClick = (bool: boolean) => {
    setShowJoin(bool);
  };

  const handleShowMenu = () => {
    setShowMenu(!showMenu);
  };

  const renderBtns = (): JSX.Element => {
    return (
      <div className="flex justify-evenly mt-3">
        <h1
          className={`font-semibold text-xl w-[120px] ${
            showJoin ? "text-apricot border-b-4 border-current" : "text-black"
          }`}
          onClick={() => handleClick(true)}
        >
          Join Room
        </h1>
        <h1
          className={`font-semibold text-xl w-[137px] ${
            !showJoin ? "text-apricot border-b-4 border-current" : "text-black"
          }`}
          onClick={() => handleClick(false)}
        >
          Create Room
        </h1>
      </div>
    );
  };
  // <h1 className='font-semibold text-xl underline decoration-3 decoration-apricot underline-offset-4' onClick={() => handleClick(false)}>Create Room</h1>

  return (
    <>
      <div className="flex flex-col justify-between items-center min-h-screen bg-custom bg-cover bg-center">
        {showMenu ? <MenuHome handleShowMenu={handleShowMenu} /> : null}
        {showMenu && (
          <div className="fixed top-0 left-0 w-full h-full bg-slate-800 opacity-50 z-40"></div>
        )}
        <NavBarHome handleShowMenu={handleShowMenu} />
        <div className="w-full flex flex-col items-center">
          <UpperTextWindow title={'Welcome to IceBreakers!'} description={"Let's get to know eachother thourhg this blah blah blah"}  />
        </div>
        <div className="bg-white flex flex-col w-[328px] h-[283px] rounded-2xl shadow">
          {renderBtns()}
          {showJoin ? (
            <JoinRoom handleRoomData={handleRoomData} />
          ) : (
            <CreateRoom handleRoomData={handleRoomData} />
          )}
        </div>
        <div className="flex w-full mb-5 justify-end">
          <HowToButton />
        </div>
      </div>
    </>
  );
};

export default Home;
