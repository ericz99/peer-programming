import React from "react";
import styled from "styled-components";

import { Text } from "../../../styles";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 1200px;
  justify-content: center;
`;

const TextStyled = styled(Text)`
  font-size: ${(props) => props.fontSize || 14}px;
  color: ${(props) => props.color || "#ffffff"};
  text-align: center;
  font-weight: 100;
  margin: 50px 0 0 0;
`;

export default function Hero() {
  return (
    <Container>
      <TextStyled fontSize={42} color="#A2B5BB">
        Share Code in Real-time with Developers
      </TextStyled>
      <TextStyled fontSize={18} color="#576F72">
        An online code editor for interviews, troubleshooting, teaching & more…
      </TextStyled>
    </Container>
  );
}
