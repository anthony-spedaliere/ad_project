import { Link } from "react-router-dom";
import styled from "styled-components";

export const IconContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  margin: 20px 0;
`;

export const IconLink = styled(Link)`
  display: block;
  width: 40px;
  height: 40px;
`;

export const Icon = styled.img`
  width: 100%;
  height: 100%;
`;
