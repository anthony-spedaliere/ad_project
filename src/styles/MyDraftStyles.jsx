import { Link } from "react-router-dom";
import styled from "styled-components";

export const MyDraftContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
`;

export const NewDraftContainer = styled.div`
  margin: 0 2rem;
  min-width: 120rem;
`;

export const MyDraftCustomLink = styled(Link)`
  color: ${(props) => props.$customColor || "white"};
  text-decoration: ${(props) => props.$textDecoration || "underline"};
  font-size: ${(props) => props.$fontSize || "2rem"};
  transition: color 0.3s ease;
  margin-left: ${(props) => props.$marginLeft || "none"};
  font-weight: ${(props) => props.$fontWeight || "none"};

  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    color: var(--color-grey-400);
  }
`;

export const LeaveButton = styled.button`
  color: var(--red-color);
  text-decoration: none;
  font-size: 2rem;
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    color: var(--color-grey-400);
  }
`;

export const ProgressBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const NewDraftFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 2rem;
`;

export const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;
  width: 100rem;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100rem;
`;

export const CustomSpan = styled.span`
  display: flex;
  align-items: center;
  justify-content: ${(props) => props.$justifyContent || "none"};
`;
