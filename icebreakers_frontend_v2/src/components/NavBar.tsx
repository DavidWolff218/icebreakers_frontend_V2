import { User } from "../types/types";
//@ts-ignore
import { UilBars } from "@iconscout/react-unicons";

type NavProps = {
  user: User;
  host: User;
  roomName: string;
  handleShowMenu: () => void;
};

const NavBar = ({ user, host, roomName, handleShowMenu }: NavProps) => {
  return (
    <nav className="w-full flex justify-start items-center">
      <UilBars size="24" className="mt-7 ml-4" onClick={handleShowMenu} />
      <h2 className="text-4xl italic font-normal grow mt-7">IceBreakers</h2>
      <div className="h-6 w-6 mt-7 mr-4"/>
    </nav>
  );
};

export default NavBar;
