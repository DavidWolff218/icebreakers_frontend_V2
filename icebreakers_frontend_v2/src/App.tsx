import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Home from "./Home";
import Room from "./Room";
import "./CSS/App.css";
import { User, RoomData, RoomInfo } from "./types/types";
import { API_ROOT } from "./constants";

function App() {
  const [roomInfo, setRoomInfo] = useState<RoomInfo>({
    user: { id: null, username: "" },
    roomName: "",
    host: { id: null, username: "" },
    gameStarted: false,
  });

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const token = sessionStorage.getItem("token");
        if (token) {
          const resp = await fetch(`${API_ROOT}/verify_token`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            }, 
          });
          if (resp.ok) {
            const data = await resp.json();
            if (data.room) {
              setRoomInfo({
                user: { username: data.user.username, id: data.user.id },
                roomName: data.room.room_name,
                host: { id: data.room.host_id, username: data.room.host_name },
                gameStarted: data.room.game_started,
              });
            }
          } else {
            console.error("Token is invalid or missing");
          }
        } 
      } catch (error) {
        console.error(error);
      }
    };
    verifyToken();
  }, []);

  const handleRoomData = (room: RoomData, user: User) => {
    setRoomInfo({
      user: { username: user.username, id: user.id },
      roomName: room.room_name,
      host: { id: room.host_id, username: room.host_name },
      gameStarted: room.game_started,
    });
  };

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home handleRoomData={handleRoomData} />} />
          <Route
            path="/room/:roomId"
            element={
              roomInfo.user.id !== null ? <Room roomInfo={roomInfo} /> : null
            }
          />
          {/* this conditional is for token check and proper rendering. without it will not properly set state and room will render before it should */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
