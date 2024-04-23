export type User = {
  id: number;
  username: string;
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
    Accept?: string;
  };
  body: string;
};

export type RoomInfo = {
  user: User;
  roomName: string;
  host: User;
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
    currentPlayer: User,
    nextPlayer: User
    currentQuestion: CurrentQuestion,
    reshufflingUsers: boolean,
    reshufflingQuestions: boolean,
    allUsers: UserData[],
    gameActive: boolean,
}