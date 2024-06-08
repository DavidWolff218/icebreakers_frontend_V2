import { User } from "../types/types";
//@ts-ignore
import { UilBars } from '@iconscout/react-unicons'

type NavProps = {
  user: User;
  host: User;
  roomName: string;
  handleShowMenu: () => void;
};

const NavBar = ({
  user,
  host,
  roomName,
  handleShowMenu
}: NavProps) => {

 
  return (
    <nav className="absolute top-0 left-0 w-full">
    <div className="w-full flex justify-center relative">
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
        <UilBars size="24" className="mt-7" onClick={handleShowMenu} />
      </div>
      <h2 className="text-4xl italic font-normal mt-7">
        IceBreakers
      </h2>
    </div>
  </nav>
  );
};

export default NavBar;


// <nav className="absolute top-0 left-0 w-full flex items-center justify-center" >
// <UilBars size="24" color="#000000" />
// <h2 className="text-4xl italic font-normal mt-7" >
//   IceBreakers
// </h2>
// </nav>