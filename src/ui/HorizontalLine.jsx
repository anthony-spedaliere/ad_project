import {
  LineContainer,
  Line,
  Box,
  BoxContainer,
} from "../styles/HorizontalLineStyles";

function HorizontalLine() {
  return (
    <LineContainer>
      <Line />
      <BoxContainer>
        <Box>OR</Box>
      </BoxContainer>
      <Line />
    </LineContainer>
  );
}

export default HorizontalLine;
