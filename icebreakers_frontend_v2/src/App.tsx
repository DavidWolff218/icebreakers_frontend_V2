import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import Room from "./Room";
// @ts-ignore
import { ActionCableConsumer } from "@thrash-industries/react-actioncable-provider";
import "./CSS/App.css";

type User = {
  id: number;
  username: string;
};

type RoomInfo = {
  user: User;
  roomName: string;
  hostID: number;
  hostName: string;
  gameStarted: boolean;
};

function App() {

  const [roomInfo, setRoomInfo] = useState<RoomInfo>({
    user: { username: "", id: 0 },
    roomName: "",
    hostID: 0,
    hostName: "",
    gameStarted: false,
  });

  return (
    <div className="App">
      HIHIHI
      <Router>
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
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
