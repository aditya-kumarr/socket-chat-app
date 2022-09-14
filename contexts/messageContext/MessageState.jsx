import React, { useReducer, useEffect } from "react";
import ACTIONS from "./MessageActions";
import MessageContext from "./MessageContext";
import { io } from "socket.io-client";
const socket = io("http://localhost:3000");

const reducer = (state = [], action) => {
  if (action.type === ACTIONS.ADD_MESSAGE) {
    socket.emit("send-message", action.payload);
    return [...state, action.payload];
  }
  if (action.type === ACTIONS.RECEIVE_MESSAGE) {
    return [...state, action.payload];
  }
  return state;
};

const MessageState = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);
  useEffect(() => {
    // first
    socket.on("connection", (message) => console.log(message));
    socket.on("receive-message", (message) =>
      dispatch({
        type: ACTIONS.RECEIVE_MESSAGE,
        payload: { text: message.text, author: "other" },
      })
    );
  }, []);

  return (
    <MessageContext.Provider
      value={{ messages: state, messageDispatch: dispatch }}
    >
      {children}
    </MessageContext.Provider>
  );
};

export default MessageState;
