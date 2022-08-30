import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
`;

const Label = styled.label`
  margin-bottom: 10px;
  font-size: 16px;
`;

const Select = styled.select`
  position: relative;
  padding: 5px;
`;

interface SelectionProps {
  label: string;
  selections: any;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
}

export default function Selection({
  label,
  selections,
  setTheme,
}: SelectionProps) {
  const keys = Object.keys(selections);

  return (
    <Container>
      <Label>{label}</Label>
      <Select onChange={(e) => setTheme(e.target.value)}>
        {keys.map((data, idx) => (
          <option key={idx} value={data}>
            {data}
          </option>
        ))}
      </Select>
    </Container>
  );
}
