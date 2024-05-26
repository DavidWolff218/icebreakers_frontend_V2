import { User } from "../types/types";

type NavProps = {
  user: User;
  host: User;
  handleLogOut: () => void;
  handleEndGame: () => void;
  roomName: string;
};

const NavBar = ({
  user,
  host,
  handleLogOut,
  handleEndGame,
  roomName,
}: NavProps) => {
  const logOutBtn = (): JSX.Element => {
    if (user.id === host.id) {
      return <button onClick={handleEndGame}>END</button>;
    } else {
      return <button onClick={handleLogOut}>LOG</button>;
    }
  };

  return (
    <nav className="absolute top-0 left-0 w-full flex items-center justify-center" >
      <h2 className="text-4xl italic font-normal mt-7" >
        IceBreakers
      </h2>
    </nav>
  );
};

export default NavBar;
