import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import GlobalStyles from "./styles/GlobalStyles";

// Create query client for react-query
const queryClient = new QueryClient({
  queries: {
    staleTime: 60 * 1000,
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyles />
      <ReactQueryDevtools />
      <h1>TEST</h1>
    </QueryClientProvider>
  );
}

export default App;
