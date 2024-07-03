import styled from "styled-components";
import { useUser } from "../authentication/useUser";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserId } from "../store/slices/userSlice";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--background-color);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 1. load the authenticated user
  const { isPending, isAuthenticated, isFetching, user } = useUser();

  // 2. if there is no authenticated user, redirect to the /login page
  useEffect(
    function () {
      if (!isPending && !isAuthenticated && !isFetching) navigate("/login");
    },
    [isAuthenticated, isPending, navigate, isFetching]
  );

  // add user id to the global state
  useEffect(() => {
    if (isAuthenticated && user?.id) {
      dispatch(setUserId(user.id));
    }
  }, [isAuthenticated, user, dispatch]);

  // 3. while loading, show spinner
  if (isPending)
    return (
      <FullPage>
        <Spinner />;
      </FullPage>
    );

  // 4. if there is a user, render the app
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
