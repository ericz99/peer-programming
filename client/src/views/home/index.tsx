import React, { useContext } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import uuid from "short-uuid";

import { Hero } from "./components";
import { GlobalContext } from "../../context/GlobalContext";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: rgb(17, 84, 119);
  background: linear-gradient(
    0deg,
    rgba(17, 84, 119, 1) 0%,
    rgba(6, 4, 56, 1) 100%
  );
  padding: 150px 0;
`;

export default function Home() {
  const { setRoomData } = useContext(GlobalContext);
  const navigate = useNavigate();

  const onClick = () => {
    const roomID = uuid.generate();

    setRoomData({
      id: roomID,
      users: [],
    });
    navigate(`/rooms/${roomID}`);
  };

  return (
    <Wrapper>
      <Hero />
      <button type="button" onClick={onClick}>
        Generate Room
      </button>
    </Wrapper>
  );
}
