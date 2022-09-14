import React, { useReducer } from "react";
import ACTIONS from "./MessageActions";
import MessageContext from "./MessageContext";

const reducer = (state = [], action) => {
  if (!ACTIONS[action.type]) return state;
  return ACTIONS[action.type](state, action.payload);
};

const MessageState = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);

  return (
    <MessageContext.Provider value={{ state, dispatch }}>
      {children}
    </MessageContext.Provider>
  );
};

export default MessageState;
