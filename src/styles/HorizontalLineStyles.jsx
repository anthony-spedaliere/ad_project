import styled from "styled-components";

export const LineContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin: 20px 0;
  position: relative;
`;

export const Line = styled.div`
  flex: 1;
  height: 2px;
  background-color: #3c3b48;
`;

export const BoxContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  position: absolute;
`;

export const Box = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #3c3b48;
  color: #c9c7f2;
  font-weight: 700;
`;
