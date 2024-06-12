import { User } from "../types/types";
//@ts-ignore
import { UilTimes, UilQuestionCircle, UilShareAlt, UilSignOutAlt,} from "@iconscout/react-unicons";

type MenuProps = {
  handleShowMenu: () => void;
  handleLogOut: () => void;
  handleEndGame: () => void;
  roomName: string;
  user: User;
  host: User;
};

const Menu = ({ handleShowMenu, handleLogOut, handleEndGame, roomName, user, host }: MenuProps) => {

  const handleInviteLink = () => {
    //putting in conditional to check for roomnamn, mighnt not end up using
    if(roomName){
      navigator.clipboard.writeText(`http://localhost:3001/?room=${roomName}`)
    } else {
      navigator.clipboard.writeText(`http://localhost:3001/`)
    }
  }

  return (
    <div className="fixed flex flex-col top-0 left-0 w-2/3 h-screen bg-white z-50 rounded-r-2xl rounded-l-[32px] border-y-4 border-l-4 border-apricot">
      <div className="flex items-center justify-between p-4 ">
        <h1 className="font-semibold text-xl">Menu</h1>
        <UilTimes size="25" onClick={handleShowMenu} />
      </div>
      <div className="mx-auto w-11/12 border-b-3 rounded-2xl border-gray"></div>
      <div className="flex items-center px-4 py-6">
        <UilQuestionCircle size="20" />
        <h2 className="pl-5">How To Play</h2>
      </div>
      <div className="mx-auto w-11/12 border-b-2 rounded-2xl border-gray"></div>
      <div onClick={handleInviteLink} className="flex items-center px-4 py-6">
        <UilShareAlt size="20" />
        <h2 className="pl-5">Invite Link</h2>
      </div>
      <div className="mx-auto w-11/12 border-b-2 rounded-2xl border-gray"></div>
      <div className="flex items-center px-4 py-6">
        <UilSignOutAlt size="20" />
        {user.id === host.id ? <h2 onClick={handleEndGame} className="pl-5">Endgame</h2> : <h2 onClick={handleLogOut} className="pl-5">Logout</h2>}
      </div>
      <div className="mx-auto w-11/12 border-b-3 rounded-2xl border-gray"></div>

      <div className="flex mt-auto items-center px-4 py-6">
        <h2 className="font-semibold">
          Room Code: <span className="font-normal">{roomName}</span>
        </h2>
      </div>
    </div>
  );
};

export default Menu;
