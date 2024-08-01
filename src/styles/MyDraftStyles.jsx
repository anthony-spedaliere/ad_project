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

export const ButtonHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const MyDraftCustomLink = styled(Link)`
  color: ${(props) => props.$customColor || "white"};
  text-decoration: ${(props) => props.$textDecoration || "underline"};
  font-size: ${(props) => props.$fontSize || "2rem"};
  transition: color 0.3s ease;
  margin-left: ${(props) => props.$marginLeft || "0"};
  font-weight: ${(props) => props.$fontWeight || "100"};

  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    color: var(--color-grey-400);
  }
`;

export const NewDraftButton = styled.button`
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
  justify-content: ${(props) => props.$justifyContent || "flex-end"};
  margin-top: ${(props) => props.$marginTop || "0"};
  width: 100rem;
`;

export const CustomSpan = styled.span`
  display: flex;
  align-items: center;
  justify-content: ${(props) => props.$justifyContent || "none"};
`;

export const TeamRowContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: start;
  gap: 1rem;
`;

export const TeamRowTeamNameContainer = styled.div`
  flex: ${(props) => props.$flex || "none"};
  display: flex;
  flex-direction: column;
`;

export const PoiRowPoiNameContainer = styled.div`
  flex: ${(props) => props.$flex || "none"};
  display: flex;
  flex-direction: column;
`;

export const TeamRowError = styled.span`
  font-size: 1.4rem;
  color: var(--red-color);
`;

export const PoiRowError = styled.span`
  font-size: 1.4rem;
  color: var(--red-color);
`;

export const TeamHeader = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: start;
`;

export const TeamHeaderItem = styled.div`
  flex: 1;
  text-align: start;
  font-weight: bold;
  color: var(--brand-color);
`;

export const TeamContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
