import React, { useReducer, useEffect, useState } from "react";
import ConnectionContext from "./ConnectionContext";
import { io } from "socket.io-client";
import ACTIONS from "../Actions";
const socket = io("http://localhost:3000");

const servers = {
  iceServers: [
    {
      urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"],
    },
  ],
  iceCandidatePoolSize: 10,
};

const pc = new RTCPeerConnection(servers);
// let localStream = null;
// let remoteStream = null;

const reducer = (state = [], action) => {
  if (action.type === ACTIONS.SEND_OFFER) {
    // socket.emit("send-message", action.payload);
    return {
      ...state,
      pc: action.payload.pc,
      dataChannel: action.payload.dataChannel,
    };
  }
  if (action.type === ACTIONS.RECEIVE_OFFER) {
    return {
      ...state,
      pc: action.payload.pc,
      dataChannel: action.payload.dataChannel,
    };
  }
  return state;
};

const ConnectionState = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    pc: pc,
    socket: socket,
    dataChannel: null,
  });
  useEffect(() => {
    console.log(state);
  }, [state]);

  return (
    <ConnectionContext.Provider
      value={{
        pc: state.pc,
        socket: state.socket,
        dataChannel: state.dataChannel,
        connectionDispatch: dispatch,
      }}
    >
      {children}
    </ConnectionContext.Provider>
  );
};

export default ConnectionState;
