import { User, Host } from "../types";

type NavProps = {
  user: User,
  host: Host,
  handleLogOut: () => void
  handleEndGame: () => void
}

const NavBar = ({user, host, handleLogOut, handleEndGame}: NavProps) => {
  const logOutBtn = (): JSX.Element => {
    if (user.id === host.id) {
      return <button onClick={handleEndGame}>ENDGAME</button>;
    } else {
      return <button onClick={handleLogOut}>LOGOUT</button>;
    }
  };

  return <>{logOutBtn()}</>;
};

export default NavBar;
