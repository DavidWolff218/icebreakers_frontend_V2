import { useState } from "react";
import { RoomData, UserData } from "../types/types";
import { API_ROOT } from "../constants";
import { useNavigate } from "react-router-dom";
import { ReqObj, RoomForm } from "../types/types";

type JoinProps = {
  handleRoomData: (room: RoomData, user: UserData) => void
}

const JoinRoom = ({handleRoomData}: JoinProps) => {

  const navigate = useNavigate()

  const [joinForm, setJoinForm] = useState<RoomForm>({
    room_name: "",
    username: ""
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setJoinForm((prevState: RoomForm) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const reqObj: ReqObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        room: joinForm as RoomForm,
      }),
    };
    try {
      const resp = await fetch(`${API_ROOT}`, reqObj);
      if (!resp.ok) {
        console.error(resp);
      } else {
        const data = await resp.json()
        sessionStorage.setItem("token", data.jwt);
        handleRoomData(data.room, data.user)
        navigate(`/room/${data.room.id}`)
      }
    } catch(error) {
      console.error("Error joining Room or creating Username:", error)
    }
  };

  return (
    <div>
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
