import React, { useReducer } from "react";

import {
  SET_CURRENT_USER,
  SET_ROOM_DATA,
  ADD_USER,
  REMOVE_USER,
} from "../constants";

import { RoomData, UserData, StateProps } from "../interfaces";
import { GlobalContext } from "./GlobalContext";
import Reducer from "./Reducer";

interface GlobalStateProps {
  children: React.ReactNode;
}

const initialState: StateProps = {
  room: {
    users: [],
  },
  currentUser: {},
};

export default function GlobalState({ children }: GlobalStateProps) {
  const [state, dispatch] = useReducer(Reducer, initialState);

  const setCurrentUser = (socket: any) => {
    dispatch({
      payload: socket,
      type: SET_CURRENT_USER,
    });
  };

  const setRoomData = (room: RoomData) => {
    dispatch({
      payload: room,
      type: SET_ROOM_DATA,
    });
  };

  const addUserToRoom = (user: UserData, room: RoomData) => {
    dispatch({
      payload: {
        user,
        room,
      },
      type: ADD_USER,
    });
  };

  const removeUserFromRoom = (user: UserData, room: RoomData) => {
    dispatch({
      payload: {
        user,
        room,
      },
      type: REMOVE_USER,
    });
  };

  return (
    <GlobalContext.Provider
      value={{
        room: state.room,
        currentUser: state.currentUser,
        setCurrentUser,
        setRoomData,
        addUserToRoom,
        removeUserFromRoom,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
