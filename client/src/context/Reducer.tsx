/* eslint-disable import/no-anonymous-default-export */
import { RoomData, StateProps, UserData } from "../interfaces";

import {
  SET_CURRENT_USER,
  SET_ROOM_DATA,
  ADD_USER,
  REMOVE_USER,
} from "../constants";

interface ActionProps<T> {
  type: string;
  payload: T | RoomData | UserData;
}

const initialState: StateProps = {
  room: {
    users: [],
  },
  currentUser: {},
};

const reducer = <T extends object>(
  state: StateProps = initialState,
  action: ActionProps<T>
) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    case SET_ROOM_DATA:
      return {
        ...state,
        room: action.payload,
      };
    case ADD_USER:
      return {
        ...state,
        room: {
          ...state.room,
          users: [...state.room.users!, action.payload],
        },
      };
    case REMOVE_USER:
      return {
        ...state,
        room: {
          ...state.room,
          users: state.room.users!.filter((u) => u.id !== action.payload),
        },
      };
    default:
      return state;
  }
};

export default reducer;
