import { User } from "../types/types";

type WaitingRoomProps = {
  host: User;
  user: User;
  handleStartClick: () => void;
  allUsers: User[];
};

const WaitingRoom = ({
  host,
  user,
  allUsers,
  handleStartClick,
}: WaitingRoomProps) => {
  const startButton = () => {
    return <button onClick={handleStartClick}>Start The Game</button>;
  };

  const renderAllUsers = (allUsers: User[]): JSX.Element[] => {
    return allUsers.map((user: any) => {
      return <h2 key={user.id}>{user.username}</h2>;
    });
  };

  const waitingRoomText = () => {
    if (host.id === user.id) {
      return (
        <h2>
          As the host, you can start the game whenever your party is ready!
          <div>{renderAllUsers(allUsers)}</div>
          {startButton()}
        </h2>
      );
    } else {
      return (
        <div>
          <h2>
            The host, <span>{host.username}</span>, will start the game soon!
            <div>{renderAllUsers(allUsers)}</div>
          </h2>
        </div>
      );
    }
  };

  return <>{waitingRoomText()}</>;
};

export default WaitingRoom;
