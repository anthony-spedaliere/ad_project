import styled from "styled-components";
import { useUser } from "../authentication/useUser";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--background-color);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  // 1. load the authenticated user
  const { isLoading, isAuthenticated, isFetching } = useUser();

  // 2. if there is no authenticated user, redirect to the /login page
  useEffect(
    function () {
      if (!isLoading && !isAuthenticated && !isFetching) navigate("/login");
    },
    [isAuthenticated, isLoading, navigate, isFetching]
  );

  // 3. while loading, show spinner
  if (isLoading)
    return (
      <FullPage>
        <Spinner />;
      </FullPage>
    );

  // 4. if there is a user, render the app
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
