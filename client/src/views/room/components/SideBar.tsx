import { useState } from "react";
import styled from "styled-components";
import { BsGear, BsDownload } from "react-icons/bs";

import Selection from "./Selection";

const Container = styled.div`
  height: 100%;
  max-width: 50px;
  width: 100%;
  box-sizing: border-box;
  background: #383838;
  display: flex;
`;

const TagList = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const TagItem = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: relative;

  button {
    cursor: pointer;
    padding: 5px;
    height: 50px;
    max-width: 50px;
    width: 100%;
    color: #d3dedc;
    font-size: 18px;
  }

  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background: #000000;
    height: 1px;
  }
`;

const SectionPanel = styled.section`
  width: 250px;
  transition: all ease-in-out 0.3s;
  padding: 15px;

  h1 {
    font-weight: 100;
    margin-bottom: 25px;
    font-size: 32px;
  }
`;

interface SideBarProps {
  setTheme: React.Dispatch<React.SetStateAction<string>>;
  themeSelection: any;
}

export default function SideBar({ setTheme, themeSelection }: SideBarProps) {
  const [isToggle, setToggle] = useState<boolean>(false);

  return (
    <>
      <Container>
        <TagList>
          <TagItem>
            <button type="button" onClick={() => setToggle((prev) => !prev)}>
              <BsGear />
            </button>
          </TagItem>
          <TagItem>
            <button type="button">
              <BsDownload />
            </button>
          </TagItem>
        </TagList>
      </Container>
      {isToggle && (
        <SectionPanel>
          <h1>Settings</h1>
          <Selection
            label="theme"
            selections={themeSelection}
            setTheme={setTheme}
          />
        </SectionPanel>
      )}
    </>
  );
}
