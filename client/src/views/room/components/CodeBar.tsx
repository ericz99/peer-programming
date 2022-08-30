import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ReactCodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { cpp } from "@codemirror/lang-cpp";
import { python } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java";
import { Socket } from "socket.io-client";
import { useParams } from "react-router-dom";

import { ServerToClientEvents, ClientToServerEvents } from "../interfaces";

const Container = styled.div`
  flex: 8;
`;

interface CodeMirrorProps {
  socket: Socket<ServerToClientEvents, ClientToServerEvents>;
  theme: any;
}

export default function CodeMirror({ socket, theme }: CodeMirrorProps) {
  const [codeValue, setCodeValue] = useState<string>("");
  const { id } = useParams();

  const onChange = React.useCallback(
    (value) => {
      setCodeValue(value);
      // # on replay if user typed
      socket.emit(
        "replayUserKeyboard",
        {
          keyPressed: value,
        },
        { id }
      );
    },
    [socket, id]
  );

  useEffect(() => {
    if (socket.connected) {
      socket.on("replayUserKeyboard", ({ keyPressed }) => {
        setCodeValue(keyPressed);
      });
    }
  }, [socket]);

  return (
    <Container>
      <ReactCodeMirror
        value={codeValue}
        height="100vh"
        extensions={[javascript(), java(), cpp(), python()]}
        theme={theme}
        onChange={onChange}
      />
    </Container>
  );
}
