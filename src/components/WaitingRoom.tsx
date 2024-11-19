import { User } from "../types/types";
import UpperTextWindow from "./UpperTextWindow";
//@ts-ignore
import { UilShareAlt } from "@iconscout/react-unicons";

type WaitingRoomProps = {
  host: User;
  user: User;
  handleStartClick: () => void;
  allUsers: User[];
  showMenu: boolean;
  roomName: string;
};

const WaitingRoom = ({
  host,
  user,
  allUsers,
  handleStartClick,
  showMenu,
  roomName,
}: WaitingRoomProps) => {

  const startButton = () => {
    return (
      <button
        className="bg-apricot font-semibold w-[222px] h-[34px] px-[26px] rounded-[32px] shadow"
        onClick={handleStartClick}
        disabled={showMenu}
      >
        Everybody's Here!
      </button>
    );
  };

  const renderAllUsers = (allUsers: User[]): JSX.Element[] => {
    return allUsers.map((user: any) => {
      return (
        <div className="w-full border-b-[1.5px] border-gray py-1.5">
          <h3 key={user.id}>{user.username}</h3>
        </div>
      );
    });
  };

  const handleInviteLink = () => {
    navigator.clipboard.writeText(`http://localhost:3001/?room=${roomName}`);
  };

  const waitingRoomText = () => {
    if (host.id === user.id) {
      return (
        <>
        <UpperTextWindow title="Glad you're here!" description={"As the host, you can start the game when everyone is here."}/>
          <div className="bg-white w-[328px] h-[346px] flex flex-col items-center rounded-2xl">
            <div className="flex items-center w-full justify-between">
              <div className="h-[40px] w-[40px]" />
              <h2 className="font-semibold text-[22px] leading-5 pt-3">
                Players
              </h2>
              <UilShareAlt
                onClick={handleInviteLink}
                className="pt-3 pr-4"
                size="40"
              />
            </div>
            <div className="w-full px-8">
              <div className="h-[227px] border-y-3 border-gray mt-1 overflow-y-auto overflow-x-hidden">
                {renderAllUsers(allUsers)}
              </div>
            </div>
            <div className="my-auto">{startButton()}</div>
          </div>
        </>
      );
    } else {
      return (
        <>
          <UpperTextWindow title="Sit tight!" description={"Your host will start the game soon."}/>
          <div className="bg-white w-[328px] h-[284px] flex flex-col items-center rounded-2xl">
            <div className="flex items-center w-full justify-between">
              <div className="h-[40px] w-[40px]" />
              <h2 className="font-semibold text-[22px] leading-5 pt-3">
                Players
              </h2>
              <UilShareAlt
                onClick={handleInviteLink}
                className="pt-3 pr-4"
                size="40"
              />
            </div>
            <div className="w-full px-8">
              <div className="h-[227px] border-y-3 border-gray mt-1 overflow-y-auto overflow-x-hidden">
                {renderAllUsers(allUsers)}
              </div>
            </div>
          </div>
        </>
      );
    }
  };

  return <>{waitingRoomText()}</>;
};

export default WaitingRoom;

//
