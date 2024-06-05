import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { API_ROOT } from "./constants";
import NavBar from "./components/NavBar";
import { RoomInfo } from "./types/types";
import WaitingRoom from "./components/WaitingRoom";
import GameText from "./components/GameText";
import UseGameState from "./hooks/useGameState";
import EndGameModal from "./modals/EndGameModal";
import RoomCodeBox from "./components/RoomCodeBox";
import HowToButton from "./components/HowToButton";
import Menu from "./components/Menu";
// @ts-ignore
import { ActionCableConsumer } from "@thrash-industries/react-actioncable-provider";

type RoomProps = {
  roomInfo: RoomInfo;
};

const Room = ({ roomInfo }: RoomProps) => {
  const { roomId } = useParams();

  const navigate = useNavigate();

  const { user, roomName, host, gameStarted } = roomInfo;

  const [showMenu, setShowMenu] = useState(false)

  const {
    gameRound,
    setGameRound,
    handleReceived,
    hostEnd,
    resetQuestionsShuffle,
    allUsers,
    setAllUsers,
  } = UseGameState();

  useEffect(() => {
    if (!gameStarted) {
      const fetchUsers = async () => {
        try {
          const resp = await fetch(`${API_ROOT}/users/by_room/${roomId}`);
          if (!resp.ok) {
            throw new Error("Could not grab all users");
          } else {
            const data = await resp.json();
            setAllUsers(data.allUsers);
          }
        } catch (error) {
          alert(error);
        }
      };
      fetchUsers();
    } else {
      const fetchRound = async () => {
        try {
          const resp = await fetch(`${API_ROOT}/users/midgame/${roomId}`);
          if (!resp.ok) {
            console.log("there was an error");
          }
          const data = await resp.json();
          setGameRound((prevState) => ({
            ...prevState,
            currentPlayer: data.currentPlayer,
            nextPlayer: data.nextPlayer,
            currentQuestion: data.currentQuestion,
            gameActive: data.room.game_started,
          }));
        } catch (error) {
          console.error(error);
        }
      };
      fetchRound();
    }
  }, []);

  useEffect(() => {
    if (hostEnd) {
      setTimeout(() => {
        sessionStorage.removeItem("token");
        navigate("/", { replace: true });
      }, 5000);
    }
  }, [hostEnd]);

  const handleNextClick = async () => {
    try {
      const reqObj = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: {
            room: roomId,
            currentPlayerID: gameRound.currentPlayer.id,
            nextPlayerID: gameRound.nextPlayer.id,
          },
          question: {
            id: gameRound.currentQuestion.id,
          },
        }),
      };
      const resp = await fetch(`${API_ROOT}/users/select`, reqObj);
      if (!resp.ok) {
        console.log("Could no get next question");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleShowMenu = () => {
    setShowMenu(!showMenu)
  }

  const handleLogOut = async () => {
    // let id = user.id;
    if (gameRound.currentPlayer.id === user.id) {
      handleNextClick();
    }
    const reqObj = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        user: {
          id: user.id,
          room: roomId
        },
      }),
    };
    try {
      await fetch(`${API_ROOT}/users/${user.id}`, reqObj);
      sessionStorage.removeItem("token");
      navigate("/", { replace: true });
    } catch (error) {
      console.error(error);
    }
  };

  const handleEndGame = async () => {
    const reqObj = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        room: {
          id: roomId,
        },
      }),
    };
    await fetch(`${API_ROOT}/rooms/${roomId}`, reqObj);
    try {
      sessionStorage.removeItem("token");
      navigate("/", { replace: true });
    } catch (error) {
      console.error(error);
    }
  };

  const handleStartClick = async () => {
    try {
      const reqObj = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: {
            room: roomId,
          },
        }),
      };
      const resp = await fetch(`${API_ROOT}/users/start`, reqObj);
      if (!resp.ok) {
        console.log("in the if");
        const errorData = await resp.json();
        throw new Error(
          errorData.error || `HTTP error! Status: ${resp.status}`
        );
      }
    } catch (error) {
      console.log("in the catch");

      console.error(error);
      alert(error);
    }
  };

  const screenText = () => {
    //can't get this to work using useGameState and not props
    return (
      <div>
        <GameText
          gameRound={gameRound}
          resetQuestionsShuffle={resetQuestionsShuffle}
          handleNextClick={handleNextClick}
          user={user}
          host={host}
        />
      </div>
    );
  };

  const waitingText = () => {
    //***not sure if need this conditional still */
    if (!gameStarted) {
      return (
        <WaitingRoom
          host={host}
          user={user}
          handleStartClick={handleStartClick}
          allUsers={allUsers}
        />
      );
    }
    return null;
  };

  return (
    <div className='relative min-h-screen'>
      {showMenu ? <Menu /> : null}
      <NavBar
        user={user}
        host={host}
        handleLogOut={handleLogOut}
        handleEndGame={handleEndGame}
        roomName={roomName}
        handleShowMenu={handleShowMenu}
      />
      {hostEnd && <EndGameModal />}
      <ActionCableConsumer
        channel={{
          channel: "UsersChannel",
          room: roomId,
        }}
        onReceived={handleReceived}
      >
        {gameRound.gameActive ? screenText() : waitingText()}
      </ActionCableConsumer>
      < RoomCodeBox roomName={roomName}/>
      < HowToButton />
    </div>
  );
};

export default Room;
