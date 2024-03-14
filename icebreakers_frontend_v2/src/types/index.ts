
export type RoomData = {
  room_name: string;
  host_id: number;
  host_name: string;
  game_started: false;
}

export type UserData = {
  id: number;
  is_active: boolean;
  is_selected: boolean;
  username: string;
}