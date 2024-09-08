import styled from "styled-components";
import DraftLeftSidebar from "../components/DraftLeftSidebar";
import DraftRightSidebar from "../components/DraftRightSidebar";
import { Outlet } from "react-router-dom";
import DraftPageFooter from "../components/DraftPageFooter";
import DraftHeader from "../components/DraftHeader";

// Styled Components
const ScrollableMain = styled.main`
  background-color: var(--background-color);
  padding: 1rem;
  grid-area: main;
  box-sizing: border-box;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  height: 100%;
  width: 100%;

  /* Custom scrollbar styles for WebKit browsers (Chrome, Safari, Edge) */
  ::-webkit-scrollbar {
    width: 12px;
  }

  ::-webkit-scrollbar-track {
    background: var(--background-color-light);
  }

  ::-webkit-scrollbar-thumb {
    background-color: var(--background-color-dark);
    border-radius: 10px;
    border: 3px solid var(--background-color-light);
  }

  /* Firefox scrollbar styling */
  scrollbar-width: thin;
  scrollbar-color: var(--background-color-dark) var(--background-color-light);
`;

const StyledADraftLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr 26rem;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "left header right"
    "left main right"
    "footer footer footer";
  height: 100vh;
  width: 100%;
`;

function DraftPage() {
  return (
    <>
      <StyledADraftLayout>
        <DraftLeftSidebar />
        <DraftHeader />
        <ScrollableMain>
          <Outlet />
        </ScrollableMain>
        <DraftRightSidebar />
        <DraftPageFooter />
      </StyledADraftLayout>
    </>
  );
}

export default DraftPage;
