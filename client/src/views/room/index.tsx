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
  const [value, setValue] = useState<string>("");
  const [isMounted, setMounted] = useState<boolean>(false);

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

      if (!isMounted) {
        ctx.currentUser.emit("syncData", id!);
        ctx.currentUser.on("syncData", ({ data }) => {
          const { value } = data;
          if (value) {
            setValue(value);
          }
        });

        setMounted(true);
      }

      return () => {
        ctx.currentUser!.emit("leaveSession", { id });
      };
    }
  }, [ctx, id, isMounted]);

  const downloadCodeFile = () => {
    const element = document.createElement("a");
    const file = new Blob([value], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "testfile.txt";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };

  return (
    <Wrapper>
      <MainContainer>
        <CodeMirror
          socket={ctx.currentUser!}
          theme={themeSelection[theme]}
          value={value}
          setValue={setValue}
        />
      </MainContainer>
      <SideBar
        setTheme={setTheme}
        themeSelection={themeSelection}
        download={downloadCodeFile}
      />
    </Wrapper>
  );
}
