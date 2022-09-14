import React from "react";
import MessageState from "./messageContext/MessageState";

const GlobalStateContext = ({ children }) => {
  return <MessageState>{children}</MessageState>;
};

export default GlobalStateContext;
