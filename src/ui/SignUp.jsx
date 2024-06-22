import {
  SignUpTextContainer,
  SignUpText,
  SignUpStyledLink,
} from "../styles/SignUpStyles";

function SignUp() {
  return (
    <SignUpTextContainer>
      <SignUpText>Need an Account?</SignUpText>
      <SignUpStyledLink to="/signup">Sign Up</SignUpStyledLink>
    </SignUpTextContainer>
  );
}

export default SignUp;
