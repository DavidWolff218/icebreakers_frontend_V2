import { useState } from "react";
import { RoomData, User } from "../types/types";
import { API_ROOT } from "../constants";
import { useNavigate } from "react-router-dom";
import { ReqObj, RoomForm } from "../types/types";
import ErrorModal from "../modals/ErrorModal";

type JoinProps = {
  handleRoomData: (room: RoomData, user: User) => void
}

const JoinRoom = ({handleRoomData}: JoinProps) => {

  const [showError, setShowError] = useState(false);
  const [errorText, setErrorText] = useState("");

  const navigate = useNavigate()

  const [joinForm, setJoinForm] = useState<RoomForm>({
    room_name: "",
    username: ""
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setJoinForm((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleModal = () => {
    setTimeout(() => {
      setShowError(false);
      setErrorText("")
    }, 5000);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if(joinForm.username.length < 2 || joinForm.username.length > 20 ){
      setErrorText("Your name must be greater than or less than 20 chacters in length");
      setShowError(true);
      handleModal();
      return
    }
    const reqObj: ReqObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        room: joinForm,
      }),
    };
    try {
      const resp = await fetch(`${API_ROOT}`, reqObj);
      if (!resp.ok) {
        const errorData = await resp.json();
        setErrorText(errorData.error);
        setShowError(true);
        handleModal();
      } else {
        const data = await resp.json()
        sessionStorage.setItem("token", data.jwt);
        handleRoomData(data.room, data.user)
        navigate(`/room/${data.room.id}`)
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
    <div>
      {showError && < ErrorModal errorText={errorText} />}
      <form onSubmit={handleSubmit}>
        <label>Room Code</label>
        <br />
        <input
          type="text"
          value={joinForm.room_name}
          name="room_name"
          onChange={handleChange}
        ></input>
        <br />
        <label>Username</label>
        <br />
        <input
          type="text"
          value={joinForm.username}
          name="username"
          onChange={handleChange}
        ></input>
        <br />
        <button type="submit" >
          Submit
        </button>
      </form>
    </div>
  );
};

export default JoinRoom;
