import React, { useReducer, useEffect, useContext } from "react";
import ACTIONS from "../Actions";
import MessageContext from "./MessageContext";
import connectionContext from "./../connectionContext/ConnectionContext";

const MessageState = ({ children }) => {
  const { dataChannel } = useContext(connectionContext);
  const reducer = (state = [], action) => {
    if (action.type === ACTIONS.ADD_MESSAGE) {
      // socket.emit("send-message", action.payload);
      dataChannel.send(action.payload);
      return [...state, action.payload.toString()];
    }
    if (action.type === ACTIONS.RECEIVE_MESSAGE) {
      return [...state, action.payload.toString()];
    }
    return state;
  };
  const [state, dispatch] = useReducer(reducer, []);
  useEffect(() => {
    // first
   
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
