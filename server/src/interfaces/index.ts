export interface UserData {
  id: string;
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
  id: string;
  users: UserData[];
}

export interface ServerToClientEvents {
  ping: (arg: string) => void;
  replayUserKeyboard: (key: UserKeyboard, room: RoomData) => void;
  joinSession: (room: RoomData) => void;
  leaveSession: (room: RoomData) => void;
  notifyRoomEvent: (evt: ExtraEvent) => void;
  syncData: (roomId: string) => void;
}

export interface ClientToServerEvents {
  ping: () => void;
  replayUserKeyboard: (key: UserKeyboard, room: RoomData) => void;
  joinSession: (room: RoomData) => void;
  leaveSession: (room: RoomData) => void;
  notifyRoomEvent: (evt: ExtraEvent) => void;
  syncData: (roomId: string) => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  name: string;
  age: number;
}

export interface CacheData<T> {
  key: string;
  value: T | Record<string, string>;
}

export interface Data<T> {
  key: string;
  value?: T;
}
