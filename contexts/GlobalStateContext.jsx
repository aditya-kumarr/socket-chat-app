import React from "react";
import ConnectionState from "./connectionContext/ConnectionState";
import MessageState from "./messageContext/MessageState";

const GlobalStateContext = ({ children }) => {
  return <ConnectionState>
    <MessageState>{children}</MessageState>
  </ConnectionState>;
};

export default GlobalStateContext;
