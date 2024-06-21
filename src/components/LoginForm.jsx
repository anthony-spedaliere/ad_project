// LoginForm.js
import React from "react";
import { Link } from "react-router-dom"; // Assuming React Router is used for navigation
import StyledContainer from "../ui/StyledContainer";
import StyledButton from "../ui/StyledButton";
import StyledInput from "../ui/StyledInput";
import styled from "styled-components";

const FullScreenContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: var(--background-color);
`;

const LoginForm = () => {
  const handleLogin = (e) => {
    e.preventDefault();
    // Implement login logic here
  };

  return (
    <FullScreenContainer>
      <StyledContainer $width="46.5rem" $height="74rem">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <StyledInput type="text" placeholder="Username" />
          <StyledInput type="password" placeholder="Password" />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me" style={{ marginLeft: "5px" }}>
              Remember Me?
            </label>
          </div>
          <StyledButton type="submit">Login</StyledButton>
        </form>

        <Link
          to="/forgot-password"
          style={{ marginRight: "10px", color: "#35343f" }}
        >
          Forgot Password?
        </Link>

        <span>
          Need an account?{" "}
          <Link to="/signup" style={{ color: "#35343f" }}>
            Sign Up
          </Link>
        </span>
      </StyledContainer>
    </FullScreenContainer>
  );
};

export default LoginForm;
