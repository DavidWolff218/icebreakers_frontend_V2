import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import Home from "./Home";
import Room from "./Room";
import "./CSS/App.css";
import { UserData, RoomData, RoomInfo, User, Host } from "./types";



function App() {

  const [roomInfo, setRoomInfo] = useState<RoomInfo>({
    user: { userName: "", id: 0 },
    roomName: "",
    host: { id: 0, hostName: "" },
    gameStarted: false,
  });

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
          <Route path="/room/:roomId" element={roomInfo.user.id !== 0 ? (
      <Room roomInfo={roomInfo} />
    ) : (
      <Navigate to="/" replace={true} /> // ***NOT SURE IF NEED THIS, EXPERIMENT LATER
    )} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;


