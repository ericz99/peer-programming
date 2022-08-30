import { createContext } from "react";
import { ContextProps } from "../interfaces";

export const GlobalContext = createContext<ContextProps>({
  room: {
    users: [],
  },
  currentUser: null,
  setCurrentUser: () => {},
  setRoomData: () => {},
  addUserToRoom: () => {},
  removeUserFromRoom: () => {},
});
