// ProgressBar.jsx
import styled from "styled-components";
import { useSelector } from "react-redux";

const ProgressBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
  width: 100rem;
`;

const StepIndicator = styled.div`
  font-size: 2rem;
  margin-bottom: 0.5rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
`;

const BarContainer = styled.div`
  width: 100%;
  height: 10px;
  background-color: #e0e0e0;
  border-radius: 5px;
  overflow: hidden;
`;

const FilledBar = styled.div`
  width: ${(props) => props.fill}%;
  height: 100%;
  background-color: var(--blue-color);
  transition: width 0.3s ease;
`;

const ProgressBar = () => {
  const currentPage = useSelector((state) => state.draft.currentPage);

  const pageTitles = ["Set Up Draft", "Set Up Teams", "Set Up Maps"];
  const fillPercentage = (currentPage / 3) * 100;

  return (
    <ProgressBarContainer>
      <StepIndicator>Step {currentPage} of 3</StepIndicator>
      <Title>{pageTitles[currentPage - 1]}</Title>
      <BarContainer>
        <FilledBar fill={fillPercentage} />
      </BarContainer>
    </ProgressBarContainer>
  );
};

export default ProgressBar;
