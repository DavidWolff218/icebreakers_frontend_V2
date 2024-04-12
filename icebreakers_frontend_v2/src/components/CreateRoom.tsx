import { useEffect, useState } from "react";
import { API_ROOT } from "../constants";
import { RoomData, UserData } from "../types/types";
import { useNavigate } from "react-router-dom";
import { ReqObj, RoomForm } from "../types/types";
import ErrorModal from "../modals/ErrorModal";

type CreateProps = {
  handleRoomData: (room: RoomData, user: UserData) => void;
};

const CreateRoom = ({ handleRoomData }: CreateProps) => {
  const navigate = useNavigate();

  const [roomName, setRoomName] = useState("");
  const [hostName, setHostName] = useState("");
  const [showError, setShowError] = useState(false);
  const [errorText, setErrorText] = useState("");

  const handleModal = () => {
    setTimeout(() => {
      setShowError(false);
    }, 5000);
  };

  useEffect(() => {
    const fetchRoomCode = async () => {
      try {
        const resp = await fetch(`${API_ROOT}/rooms/room_code`);
        if (!resp.ok) {
          console.log("this is the error that is running")
          const errorData = await resp.json();
          setErrorText(errorData.error);
          setShowError(true);
          handleModal();
        } else {
          const data = await resp.json();
          setRoomName(data.room_name);
        }
      } catch (error) {
        if (error instanceof Error) {
          setErrorText(error.message);
          setShowError(true);
          handleModal();
          // throw new Error ("this is the new message")
        } else {
          console.error("An error occurred:", error);
        }
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
        room: { room_name: roomName, username: hostName } ,
      }),
    };

    try {
      const resp = await fetch(`${API_ROOT}/rooms`, reqObj);
      if (!resp.ok) {
        const errorData = await resp.json();
        setErrorText(errorData);
        setShowError(true);
        handleModal();
      } else {
        const data = await resp.json();
        sessionStorage.setItem("token", data.jwt);
        handleRoomData(data.room, data.user);
        navigate(`/room/${data.room.id}`);
      }
    } catch (error) {
      if (error instanceof Error) {
        setErrorText(error.message);
        setShowError(true);
        handleModal();
      } else {
        console.error("An error occurred:", error);
      }
    }
  };

  const renderForm = (): JSX.Element => {
    return (
      <div>
        Room Name: {roomName}
        <form onSubmit={handleSubmit}>
          <label>Enter Host Name</label>
          <input
            type="text"
            name="hostName"
            value={hostName}
            onChange={handleChange}
          />
          <button type="submit">Create your Room</button>
        </form>
      </div>
    );
  };

  return (
    <div>
      {showError && < ErrorModal errorText={errorText} />}
      Here we can give you the room code and you can create your host name
      {renderForm()}
    </div>
  );
};

export default CreateRoom;
