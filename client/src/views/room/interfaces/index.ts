import { Socket } from "socket.io-client";

export interface UserData {
  id?: string;
  roomId?: string;
}

export interface ExtraEvent {
  data?: any;
  type: string;
}

export interface UserKeyboard {
  keyPressed: string;
}

export interface RoomData {
  id?: string;
  users?: UserData[];
}

export interface ServerToClientEvents {
  ping: (arg: string) => void;
  replayUserKeyboard: (key: UserKeyboard, room: RoomData) => void;
  joinSession: (room: RoomData) => void;
  leaveSession: (room: RoomData) => void;
  notifyRoomEvent: (evt: ExtraEvent) => void;
  syncData: (room: RoomData) => void;
}

export interface ClientToServerEvents {
  ping: () => void;
  replayUserKeyboard: (key: UserKeyboard, room: RoomData) => void;
  joinSession: (room: RoomData) => void;
  leaveSession: (room: RoomData) => void;
  notifyRoomEvent: (evt: ExtraEvent) => void;
  syncData: (room: RoomData) => void;
}

export interface SocketData {
  name: string;
  age: number;
}

export interface ContextProps {
  room: RoomData;
  currentUser?: Socket<ServerToClientEvents, ClientToServerEvents> | null;
  expiredAt?: number;
  setCurrentUser: (socket: Socket) => void;
  setRoomData: (room: RoomData) => void;
  addUserToRoom: (user: UserData, room: RoomData) => void;
  removeUserFromRoom: (user: UserData, room: RoomData) => void;
}

export interface StateProps {
  room: RoomData;
  currentUser?: Socket<ServerToClientEvents, ClientToServerEvents> | any;
}

export interface ThemeProps {
  [theme: string]: string;
}
