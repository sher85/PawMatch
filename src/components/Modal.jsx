import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const Modal = ({ children }) => {
  // Create a reference to hold a div element
  const elRef = useRef(null);
  // Check if the reference is not set and set it to a newly created div element
  if (!elRef.current) {
    elRef.current = document.createElement("div");
  }

  useEffect(() => {
    const modalRoot = document.getElementById("modal");
    modalRoot.appendChild(elRef.current);

    // Cleanup function to remove the current div element from the modal root on unmount. The next line will return AFTER the component has unmounted from the DOM.
    return () => modalRoot.removeChild(elRef.current);
  }, []);

  // Render the children elements into the reference's current div element using createPortal
  return createPortal(<div>{children}</div>, elRef.current);
};

export default Modal;
