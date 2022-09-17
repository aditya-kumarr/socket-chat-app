import React from "react";
import ConnectionState from "./connectionContext/ConnectionState";
import MessageState from "./messageContext/MessageState";
import ModalState from "../Modal/ModalContext";
const GlobalStateContext = ({ children }) => {
  console.log("global state re-rendered");
  return (
    <ConnectionState>
      <MessageState>
        <ModalState>{children}</ModalState>
      </MessageState>
    </ConnectionState>
  );
};

export default GlobalStateContext;
