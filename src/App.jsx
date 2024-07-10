/*
Project Name: Apex Draft Project
Author: Anthony Spedaliere
Date Started: 6/15/2024
*/

//----------------Imports-----------------
// libraries
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";

// styles
import GlobalStyles from "./styles/GlobalStyles";

// pages
import Homepage from "./pages/Homepage";
import SignupPage from "./pages/SignupPage";
import MyDrafts from "./pages/MyDrafts";
import DraftHistory from "./pages/DraftHistory";
import SettingsPage from "./pages/SettingsPage";
import DashboardPage from "./pages/DashboardPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import CreateNewDraftPage from "./pages/CreateNewDraftPage";
import JoinDraftPage from "./pages/JoinDraftPage";
import DraftPage from "./pages/DraftPage";
import LoginForm from "./components/LoginForm";

// ui
import ProtectedRoute from "./ui/ProtectedRoute";
import AppLayout from "./ui/AppLayout";

// page not found
import PageNotFound from "./ui/PageNotFound";

// error page
import ErrorFallback from "./ui/ErrorFallback";
import NewDraftPageOne from "./pages/NewDraftPageOne";
import NewDraftPageTwo from "./pages/NewDraftPageTwo";
import NewDraftPageThree from "./pages/NewDraftPageThree";

//----------------End Imports-----------------

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate replace to="/dashboard/my-drafts" />,
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
    children: [
      {
        path: "dashboard",
        element: <DashboardPage />,
        children: [
          {
            path: "my-drafts",
            element: <MyDrafts />,
          },
          { path: "draft-history", element: <DraftHistory /> },
          { path: "settings", element: <SettingsPage /> },
        ],
      },
    ],
  },
  {
    path: "new-draft-one",
    element: <NewDraftPageOne />,
  },
  {
    path: "new-draft-two",
    element: <NewDraftPageTwo />,
  },
  {
    path: "new-draft-three",
    element: <NewDraftPageThree />,
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
