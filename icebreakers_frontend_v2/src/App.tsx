import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import Room from "./Room";
// @ts-ignore
import { ActionCableConsumer } from "@thrash-industries/react-actioncable-provider";
import "./CSS/App.css";
import { UserData, RoomData } from "./types";

type User = {
  id: number;
  userName: string;
};

type Host = {
  id: number;
  hostName: string;
};

type RoomInfo = {
  user: User;
  roomName: string;
  host: Host;
  gameStarted: boolean;
};

function App() {

  const [roomInfo, setRoomInfo] = useState<RoomInfo>({
    user: { userName: "", id: 0 },
    roomName: "",
    host: { id: 0, hostName: "" },
    gameStarted: false,
  });

  console.log("THIS THE ROOM", roomInfo)

  const handleRoomData = (room: RoomData, user: UserData) => {
    setRoomInfo({
      user: { userName: user.username, id: user.id },
      roomName: room.room_name,
      host: { id: room.host_id, hostName: room.host_name },
      gameStarted: room.game_started,
    });
  };

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home handleRoomData={handleRoomData}/>} />
          <Route path="/room/:roomId" element={<Room />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

{
  /* <ActionCableConsumer
channel={{
  channel: "UsersChannel",
  room: 1620,
}}
onReceived={handleReceived}
>
{/* /users/by_room/:room_id */
}
// </ActionCableConsumer> */}
