import { Host, User } from "../types";

type WaitingRoomProps = {
  host: Host;
  user: User;
  handleStartClick: () => void;
};

const WaitingRoom = ({ host, user, handleStartClick }: WaitingRoomProps) => {
  const startButton = () => {
    return <button onClick={handleStartClick}>Start The Game</button>;
  };

  const waitingRoomText = () => {
    if (host.id === user.id) {
      return (
        <h2>
          As the host, you can start the game whenever your party is ready!
          {/* <AllUsers windowText={"Lobby"} users={users} /> */}
          {startButton()}
        </h2>
      );
    } else {
      return (
        <div>
          <h2>
            The host, <span>{host.hostName}</span>, will start the game soon!
          </h2>
          {/* <AllUsers windowText={"Lobby"} users={users} /> */}
        </div>
      );
    }
  };

  return <> {waitingRoomText()}</>;
};

export default WaitingRoom;
