import { useEffect, useState } from "react";
import { API_ROOT } from "../constants";
import { RoomData, User } from "../types/types";
import { useNavigate } from "react-router-dom";
import { ReqObj } from "../types/types";
import ErrorModal from "../modals/ErrorModal";

type CreateProps = {
  handleRoomData: (room: RoomData, user: User) => void;
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
      setErrorText("");
    }, 5000);
  };

  useEffect(() => {
    const fetchRoomCode = async () => {
      try {
        const resp = await fetch(`${API_ROOT}/rooms/room_code`);
        if (!resp.ok) {
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

    if (hostName.length < 2 || hostName.length > 20) {
      setErrorText(
        "Your name must be greater than or less than 20 chacters in length"
      );
      setShowError(true);
      handleModal();
      return;
    }

    const reqObj: ReqObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        room: { room_name: roomName, username: hostName },
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

  return (
    <div className="flex flex-col flex-grow">
      {showError && <ErrorModal errorText={errorText} />}
      <form
        className="flex-grow flex flex-col items-center justify-evenly"
        onSubmit={handleSubmit}
      >
        <input
          className="border-3 w-[290px] h-[50px] px-[19px] rounded-lg border-gray"
          type="text"
          placeholder="Player Name"
          name="hostName"
          value={hostName}
          onChange={handleChange}
        />
        <input
          className="border-3 w-[290px] h-[50px] px-[19px] rounded-lg border-gray"
          type="text"
          name="hostName"
          value={roomName}
          disabled
        />
        <button
          className="bg-apricot font-semibold w-[222px] h-[34px] rounded-[32px] shadow"
          type="submit"
        >
          Create Room
        </button>
      </form>
    </div>
  );
};

export default CreateRoom;
