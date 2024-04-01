export type User = {
  id: number;
  userName: string;
};

export type Host = {
  id: number;
  hostName: string;
};


export type RoomData = {
  room_name: string;
  host_id: number;
  host_name: string;
  game_started: false;
}

export type UserData = {
  id: number;
  is_active?: boolean;
  is_selected?: boolean;
  username: string;
}

export type ReqObj = {
  method: string;
  headers: {
    "Content-Type": string;
    Accept: string;
  };
  body: string;
};

export type RoomInfo = {
  user: User;
  roomName: string;
  host: Host;
  gameStarted: boolean;
};

export type RoomForm = {
  room_name: string;
  username: string; 
};

export type CurrentQuestion = {
  id: number,
  content: string
}

export type GameRound = {
    currentPlayer: string,
    currentPlayerID: number,
    currentQuestion: CurrentQuestion,
    reshufflingUsers: boolean,
    reshufflingQuestions: boolean,
    allUsers: UserData[],
    gameActive: boolean,
}