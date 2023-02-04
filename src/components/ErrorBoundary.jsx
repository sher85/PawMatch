// reference: reactjs.org/docs/error-boundaries.html
import { Component } from "react";
import { Link } from "react-router-dom";

class ErrorBoundary extends Component {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, info) {
    // Can log error to TrackJS or NewRelic here
    console.error("ErrorBoundary caught an error", error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <h2>
          There was an error with this listing. <Link to="/">Click here</Link>{" "}
          to go back to the home page.
        </h2>
      );
    }

    // If no error, code reaches this far -> return props.children, i.e. semingly pass through
    return this.props.children;
  }
}

export default ErrorBoundary;
