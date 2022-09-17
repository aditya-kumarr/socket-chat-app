import React, { useReducer, useEffect, useContext } from "react";
import ACTIONS from "../Actions";
import MessageContext from "./MessageContext";
import connectionContext from "./../connectionContext/ConnectionContext";

const MessageState = ({ children }) => {
  const { dataChannel } = useContext(connectionContext);
  const reducer = (state = [], action) => {
    if (action.type === ACTIONS.ADD_MESSAGE) {
      // socket.emit("send-message", action.payload);
      dataChannel.send(action.payload.text);
      return [...state, action.payload];
    }
    if (action.type === ACTIONS.RECEIVE_MESSAGE) {
      return [...state, action.payload];
    }
    return state;
  };
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
