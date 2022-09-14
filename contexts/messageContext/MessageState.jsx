import React, { useReducer } from "react";
import ACTIONS from "./MessageActions";
import MessageContext from "./MessageContext";

const reducer = (state = [], action) => {
  if (action.type === ACTIONS.ADD_MESSAGE) {
    return [...state, action.payload];
  }
  return state;
};

const MessageState = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);

  return (
    <MessageContext.Provider
      value={{ messages: state, messageDispatch: dispatch }}
    >
      {children}
    </MessageContext.Provider>
  );
};

export default MessageState;
