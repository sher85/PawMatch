import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import renderApp from "../dist/server/ServerApp.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Define the port to listen on
const PORT = process.env.PORT || 3001;

// Read and store the contents of the index.html file
const html = fs
  .readFileSync(path.resolve(__dirname, "../dist/client/index.html"))
  .toString();

// Split the HTML content into two parts
const parts = html.split(
  "Not rendered, please contact developer team via github."
);

const app = express();

// Serve the assets folder as a static directory
app.use(
  "/assets",
  express.static(path.resolve(__dirname, "../dist/client/assets"))
);

// Request handler for the express app
app.use((req, res) => {
  // First half
  res.write(parts[0]);
  const stream = renderApp(req.url, {
    // Callback when the shell is ready to be rendered
    onShellReady() {
      stream.pipe(res);
    },

    // Callback for shell error handling
    onShellError() {
      // Future Feature: do error handling/logging here
    },

    // Callback when everything is ready to be written
    onAllReady() {
      // Second half
      res.write(parts[1]);
      // Close request
      res.end();
    },

    // Callback for error handling
    onError(err) {
      console.error(err);
    },
  });
});

// Start the express app
console.log(`listening on http://localhost:${PORT}`);
app.listen(PORT);
