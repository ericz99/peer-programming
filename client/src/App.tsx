import { useEffect, useState, useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { io, Socket } from "socket.io-client";

import { BaseStyled, NormalizedStyled } from "./styles";
import { Home, Room } from "./views";
import { ServerToClientEvents, ClientToServerEvents } from "./interfaces";
import { GlobalContext } from "./context/GlobalContext";

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  "http://localhost:5002",
  { transports: ["websocket"] }
);

export default function App() {
  const [_, setIsConnected] = useState(socket.connected);
  const ctx = useContext(GlobalContext);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected");
      console.log(socket);
      setIsConnected(true);
      // // run action to set current user to context
      ctx.setCurrentUser(socket);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    socket.on("connect_error", (err) => {
      console.log(err.message);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.removeAllListeners();
      socket.close();
    };
  }, []);

  return (
    <>
      <BaseStyled />
      <NormalizedStyled />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="rooms">
          <Route path=":id" element={<Room ctx={ctx} />} />
        </Route>
      </Routes>
    </>
  );
}

/**
 *
 * [x] - setCurrentUser done
 * [ ] - when a new user joined, notify everyone, then add them into room object
 * [ ] - if user dc, clear their ctx, notify everyone user left and remove them from object
 * [ ] - if user use url link, then in room.tsx just use useParmas to extract the things
 * [ ] - sync data in room.tsx if user joined, send your sync data
 *
 */

/**
 *  sync history of the code to every user that joined
 *
 *
 */
