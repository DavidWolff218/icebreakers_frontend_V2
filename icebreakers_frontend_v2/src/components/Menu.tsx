// @ts-ignore
import { UilTimes, UilQuestionCircle, UilShareAlt, UilSignOutAlt } from "@iconscout/react-unicons";

type MenuProps = {
  handleShowMenu: () => void;
};

const Menu = ({ handleShowMenu }: MenuProps) => {

  // const logOutHandler = (): JSX.Element => {
  //   return <h2>Logout</h2>;
  // };

  return (
    <div className="fixed top-0 left-0 w-2/3 bg-white z-50 rounded-r-2xl rounded-l-[32px] border-y-4 border-l-4 border-apricot">
      <div className="flex items-center justify-between p-4 ">
        <h1 className="font-semibold text-xl">Menu</h1>
        <UilTimes size="25" onClick={handleShowMenu} />

      </div>
      <div className="flex items-center px-4 py-6">
        <UilQuestionCircle size='20'/>
        <h2 className="pl-5">How To Play</h2>
      </div>
      <div className="flex items-center px-4 py-6">
      <UilShareAlt size='20'/>
      <h2 className="pl-5">Invite Link</h2>
      </div>
      <div className="flex items-center px-4 py-6">
        <UilSignOutAlt size='20' />
        <h2 className="pl-5">Logout</h2>
      </div>
      <h2>Room Code: </h2>
    </div>
  );
};

export default Menu;
