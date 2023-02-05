import { hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "../App";

hydrateRoot(
  // target the element with id "root"
  document.getElementById("root"),
  <BrowserRouter>
    {/* render the App component within the BrowserRouter */}
    <App />
  </BrowserRouter>
);
