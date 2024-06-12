import { User } from "../types/types";
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
  roomName
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
        <div className="w-[262px] border-b-[1.5px] border-gray py-1.5">
          <h3 key={user.id}>{user.username}</h3>
        </div>
      );
    });
  };

  const handleInviteLink = () => {
    navigator.clipboard.writeText(`http://localhost:3001/?room=${roomName}`)
  }

  const waitingRoomText = () => {
    if (host.id === user.id) {
      return (
        <>
    Why does this appear up here
          <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
          <div className="bg-white w-[328px] h-[346px] flex flex-col items-center rounded-2xl">
              <h2 className="font-semibold text-[22px] leading-[20px] pt-[12px]">
                Players
              </h2>
              < UilShareAlt onClick={handleInviteLink}/>
            <div className="w-[262px] h-[227px] border-y-3 border-gray mt-2 overflow-y-auto overflow-x-hidden">
              {renderAllUsers(allUsers)}
            </div>
            <div className="my-auto">{startButton()}</div>
          </div>
          </div>    
        </>
      );
    } else {
      return (
        <>
          <h2>
            The host, <span>{host.username}</span>, will start the game soon!
          </h2>
          <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
          <div className="bg-white w-[328px] h-[284px] flex flex-col items-center rounded-2xl">
            <h2 className="font-semibold text-[22px] tracking-[0.1px] leading-[20px] pt-[12px]">
              Players
            </h2>
            <div className="w-[262px] h-[227px] border-y-3 border-gray mt-2 overflow-y-auto overflow-x-hidden">
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
