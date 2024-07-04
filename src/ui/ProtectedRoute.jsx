import styled from "styled-components";
import { useUser } from "../authentication/useUser";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  setUserEmail,
  setUserId,
  setUserUsername,
} from "../store/slices/userSlice";
import { useGetUsername } from "../authentication/useGetUsername";

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
  const { data: usernameData } = useGetUsername(user?.id);

  // 2. if there is no authenticated user, redirect to the /login page
  useEffect(
    function () {
      if (!isPending && !isAuthenticated && !isFetching) navigate("/login");
    },
    [isAuthenticated, isPending, navigate, isFetching]
  );

  // add user info to the global state on login
  useEffect(() => {
    if (isAuthenticated && user?.id && usernameData) {
      dispatch(setUserId(user.id));
      dispatch(setUserEmail(user?.email));
      dispatch(setUserUsername(usernameData[0].username));
    }
  }, [isAuthenticated, user, dispatch, usernameData]);

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
