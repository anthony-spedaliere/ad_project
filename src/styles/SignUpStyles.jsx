import { Link } from "react-router-dom";
import styled from "styled-components";

export const SignUpTextContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: right;
  margin-top: auto;
`;

export const SignUpText = styled.span`
  color: #3c3b48;
  margin-right: 5px;
  font-weight: 700;
`;

export const SignUpStyledLink = styled(Link)`
  color: #3c3b48;
  font-weight: 700;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;
