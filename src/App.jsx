/*
Project Name: Apex Draft Project
Author: Anthony Spedaliere
Date Started: 6/15/2024
*/

//----------------Imports-----------------
// libraries
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

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
import LoginForm from "./components/LoginForm";
import ProtectedRoute from "./ui/ProtectedRoute";
import AppLayout from "./ui/AppLayout";

// page not found
import PageNotFound from "./ui/PageNotFound";

// error page
import ErrorFallback from "./ui/ErrorFallback";
import toast, { Toaster } from "react-hot-toast";

//----------------End Imports-----------------

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate replace to="/dashboard" />,
  },
  {
    path: "/login",
    element: <Homepage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [{ path: "dashboard", element: <DashboardPage /> }],
  },
  {
    path: "*",
    element: <PageNotFound />,
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

      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 5000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "var(--brand-color)",
            color: "var(--background-color)",
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
