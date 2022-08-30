import { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { androidstudio } from "@uiw/codemirror-theme-androidstudio";
import { dracula } from "@uiw/codemirror-theme-dracula";
import { eclipse } from "@uiw/codemirror-theme-eclipse";
import { sublime } from "@uiw/codemirror-theme-sublime";

import { ContextProps } from "./interfaces";
import { CodeMirror, SideBar } from "./components";

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
`;

const MainContainer = styled.div`
  position: relative;
  flex: 1;
`;

type RoomProps = {
  ctx: ContextProps;
};

const themeSelection: any = {
  androidstudio: androidstudio,
  dracula: dracula,
  eclipse: eclipse,
  sublime: sublime,
};

export default function Room({ ctx }: RoomProps) {
  const { id } = useParams();
  const [theme, setTheme] = useState<string>("androidstudio");

  useEffect(() => {
    if (ctx.currentUser?.connected) {
      // # join sesson
      ctx.currentUser.emit("joinSession", { id });

      // # listen to notify event
      ctx.currentUser.on("notifyRoomEvent", ({ data, type }) => {
        switch (type) {
          case "JOIN_SESSION":
            ctx.addUserToRoom(
              {
                id: data,
                roomId: id,
              },
              ctx.room
            );
            break;
          case "LEAVE_SESSION":
            ctx.removeUserFromRoom(
              {
                id: data,
                roomId: id,
              },
              ctx.room
            );
            break;
          default:
            break;
        }
      });

      return () => {
        ctx.currentUser!.emit("leaveSession", { id });
      };
    }
  }, [ctx, id]);

  useEffect(() => {
    console.log(theme);
  }, [theme]);

  return (
    <Wrapper>
      <MainContainer>
        <CodeMirror socket={ctx.currentUser!} theme={themeSelection[theme]} />
      </MainContainer>
      <SideBar setTheme={setTheme} themeSelection={themeSelection} />
    </Wrapper>
  );
}
