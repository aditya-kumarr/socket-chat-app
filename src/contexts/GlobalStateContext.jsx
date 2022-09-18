import React from "react";
import ConnectionState from "./connectionContext/ConnectionState";
import MessageState from "./messageContext/MessageState";
import ModalState from "../Modal/ModalContext";
import ToastState from "../Toast/ToastContext";
const GlobalStateContext = ({ children }) => {
  return (
    <ConnectionState>
      <MessageState>
        <ModalState>
          <ToastState>{children}</ToastState>
        </ModalState>
      </MessageState>
    </ConnectionState>
  );
};

export default GlobalStateContext;
