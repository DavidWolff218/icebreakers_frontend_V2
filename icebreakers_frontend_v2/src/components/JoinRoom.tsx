import { useState } from "react";
import { API_ROOT } from "../constants";

const JoinRoom = () => {

  type ReqObj = {
    method: string;
    headers: {
      "Content-Type": string;
      Accept: string;
    };
    body: string;
  };

  type JoinForm = {
    room_name: string;
    username: string; 
  };

  const [joinForm, setJoinForm] = useState<JoinForm>({
    room_name: "",
    username: ""
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setJoinForm((prev: JoinForm) => ({
      ...prev,
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
        room: joinForm,
      }),
    };
    try {
      const resp = await fetch('http://localhost:3000/', reqObj);
      if (!resp.ok) {
        console.error(resp);
      } else {
        const data = await resp.json()
        console.log(data)
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
