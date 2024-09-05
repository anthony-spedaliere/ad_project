import styled from "styled-components";
import DraftLeftSidebar from "../components/DraftLeftSidebar";
import DraftRightSidebar from "../components/DraftRightSidebar"; // New right sidebar
import { Outlet } from "react-router-dom";
import DraftPageFooter from "../components/DraftPageFooter";
import DraftHeader from "../components/DraftHeader";

// Styled Components
const DraftMain = styled.main`
  background-color: var(--background-color);
  padding: 4rem 4.8rem 6.4rem;
  overflow: auto;
  height: 100vh;
  grid-area: main;
  box-sizing: border-box;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 140rem;
  margin: 0 auto;
  gap: 3.2rem;
`;

const StyledADraftLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr 26rem; /* Set the layout for sidebars and content */
  grid-template-areas:
    "left header right"
    "left main right"; /* Define grid areas for header, content, and sidebars */
  min-height: 1vh;
  width: 100%;
`;

const StyledLeftSidebar = styled(DraftLeftSidebar)`
  grid-area: left; /* Place the left sidebar */
`;

const StyledRightSidebar = styled(DraftRightSidebar)`
  grid-area: right; /* Place the right sidebar */
`;

function DraftPage() {
  return (
    <>
      <StyledADraftLayout>
        <StyledLeftSidebar /> {/* Left Sidebar */}
        <DraftHeader />
        <DraftMain>
          <Container>
            <Outlet />
          </Container>
        </DraftMain>
        <StyledRightSidebar /> {/* Right Sidebar */}
      </StyledADraftLayout>
      <DraftPageFooter />
    </>
  );
}

export default DraftPage;
