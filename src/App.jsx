import { createRoot } from "react-dom/client";
import Details from "./Details";
import SearchParams from "./SearchParams";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Query client settings
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity, // ie. as long as the user is in session
      cacheTime: Infinity,
    },
  },
});

const App = () => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <header>
          <Link to={"/"}>Adopt Me!</Link>
        </header>
        <h1>Adopt love, give a home!</h1>
        <Routes>
          <Route path="/details/:id" element={<Details />} />
          <Route path="/" element={<SearchParams />} />
        </Routes>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
