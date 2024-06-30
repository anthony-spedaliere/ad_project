import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedLink } from "../store/slices/dashboardLinksSlice";
import { DashboardCustomLink } from "../styles/DashboardStyles";
import Logout from "../components/Logout";

const StyledSidebar = styled.aside`
  background-color: var(--background-color-dark);
  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--background-color);
  grid-row: 1 / -1;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  align-items: flex-start;
`;

function Sidebar() {
  const dispatch = useDispatch();
  const selectedLink = useSelector((state) => state.selectedLink.selectedLink);

  const handleLinkClick = (link) => {
    dispatch(setSelectedLink(link));
  };

  return (
    <StyledSidebar>
      <DashboardCustomLink
        to={"dashboard/my-drafts"}
        $fontWeightcustomColor={"var(--brand-color)"}
        $fontSize={"2.6rem"}
        $fontWeight={"700"}
        $selected={selectedLink === "link1"}
        onClick={() => handleLinkClick("link1")}
      >
        My Drafts
      </DashboardCustomLink>

      <DashboardCustomLink
        to={"/dashboard/draft-history"}
        $fontWeightcustomColor={"var(--brand-color)"}
        $fontSize={"2.6rem"}
        $fontWeight={"700"}
        $selected={selectedLink === "link2"}
        onClick={() => handleLinkClick("link2")}
      >
        Draft History
      </DashboardCustomLink>

      <DashboardCustomLink
        to={"/dashboard/settings"}
        $fontWeightcustomColor={"var(--brand-color)"}
        $fontSize={"2.6rem"}
        $fontWeight={"700"}
        $selected={selectedLink === "link3"}
        onClick={() => handleLinkClick("link3")}
      >
        Settings
      </DashboardCustomLink>

      <Logout />
    </StyledSidebar>
  );
}

export default Sidebar;
