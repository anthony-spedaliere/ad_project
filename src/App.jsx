/*
Project Name: Apex Draft Project
Author: Anthony Spedaliere
Date Started: 6/15/2024
*/

//----------------Imports-----------------
// libraries
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// styles
import GlobalStyles from "./styles/GlobalStyles";

// pages
import Homepage from "./pages/Homepage";
import SignupPage from "./pages/SignupPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import DashboardPage from "./pages/DashboardPage";
import CreateNewDraftPage from "./pages/CreateNewDraftPage";
import JoinDraftPage from "./pages/JoinDraftPage";
import DraftPage from "./pages/DraftPage";

// error page
import ErrorFallback from "./ui/ErrorFallback";

//----------------End Imports-----------------

// router
const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
    errorElement: <ErrorFallback />,
  },
]);

// Create query client for react-query
const queryClient = new QueryClient({
  queries: {
    staleTime: 60 * 1000,
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <GlobalStyles />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
