import { useEffect, useState } from "react";
import { API_ROOT } from "../constants";
import { RoomData, UserData } from "../types";

interface HomeProps {
  handleRoomData: (room: RoomData, user: UserData) => void;
}

const CreateRoom: React.FC<HomeProps> = ({handleRoomData}) => {
  const [roomName, setRoomName] = useState("");
  const [hostName, setHostName] = useState("");

  type RoomData = {
    room_name: string;
    username: string;
  };

  type ReqObj = {
    method: string;
    headers: {
      "Content-Type": string;
      Accept: string;
    };
    body: string;
  };

  useEffect(() => {
    const fetchRoomCode = async () => {
      try {
        const resp = await fetch(`${API_ROOT}/rooms/room_code`);
        if (resp.ok) {
          const data = await resp.json();
          setRoomName(data.room_name);
        } else {
          console.log("Failed to fetch room name");
        }
      } catch (error) {
        console.error("Error fetching room name:", error);
      }
    };
    fetchRoomCode();
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHostName(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const reqObj: ReqObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        room: { room_name: roomName, username: hostName } as RoomData,
      }),
    };

    try {
      const resp = await fetch(`${API_ROOT}/rooms`, reqObj);
      if (!resp.ok) {
        console.error(resp);
      } 
      const data = await resp.json();
      handleRoomData(data.room, data.user)
    } catch(error) {
      console.error("Error creating Room or Hostname:", error)
     }
  };

  const renderForm = (): JSX.Element => {
    return (
      <div>
        Room Name
        {roomName}
        <form onSubmit={handleSubmit}>
          <label>Enter Host Name</label>
          <input type="text" name="hostName" value={hostName} onChange={handleChange} />
          <button type="submit">
          Create your Room
        </button>
        </form>
      </div>
    );
  };

  return (
    <div>
      Here we can give you the room code and you can create your host name
      {renderForm()}
    </div>
  );
};

export default CreateRoom;
