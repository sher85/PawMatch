/* This code is used to display the React application on a server. The code exports a function that takes in a URL and some options, and returns the content of the web page as a stream. The content is created by rendering a specific React component ("App") with the help of react-dom/server and react-router-dom/server. The purpose of the code is to generate the content of the web page on the server, making it ready to be sent to a browser to display the website. */

import { renderToPipeableStream } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import App from "../App";

export default function render(url, opts) {
  // Use the renderToPipeableStream function to render the App component to a stream
  const stream = renderToPipeableStream(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>,
    opts
  );

  return stream;
}
