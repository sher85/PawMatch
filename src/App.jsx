// Static Imports
import { useState, lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import AdoptedPetContext from "./components/AdoptedPetContext";

// Dynamic Imports using lazy loading
const Details = lazy(() => import("./components/Details"));
const SearchParams = lazy(() => import("./components/SearchParams"));

// Query client settings
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Keep the queries cached for as long as the user session lasts
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

const App = () => {
  // Initialize state for the adopted pet
  const adoptedPet = useState(null);

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Suspense
          fallback={
            <div className="loading-pane">
              <h2 className="loader">🐶</h2>
            </div>
          }
        >
          <AdoptedPetContext.Provider value={adoptedPet}>
            <header>
              <Link to={"/"}>Adopt Me!</Link>
            </header>
            <h1>Adopt love, give a home!</h1>
            <Routes>
              <Route path="/details/:id" element={<Details />} />
              <Route path="/" element={<SearchParams />} />
            </Routes>
          </AdoptedPetContext.Provider>
        </Suspense>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

// Locate root and deploy application
const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
