import React, { useReducer, useEffect, useState } from "react";
import ConnectionContext from "./ConnectionContext";
import { io } from "socket.io-client";
import ACTIONS from "../Actions";
const socket = io("https://signaling-server-4go0.onrender.com");
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
  if (action.type === ACTIONS.DISCONNECT) {
    // pc.setLocalDescription()
    return {
      ...state,
      pc: new RTCPeerConnection(servers),
      dataChannel: null,
      socket: io("https://signaling-server-4go0.onrender.com"),
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
