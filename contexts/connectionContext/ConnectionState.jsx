import React, { useReducer, useEffect } from "react";
import ConnectionContext from "./ConnectionContext";
import { getOffer, setOffer } from "./ConnectionHandler";
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
    setOffer(pc, socket, action.roomID);
    return { ...state, pc: pc };
  }
  if (action.type === ACTIONS.RECEIVE_OFFER) {
    getOffer(pc, socket, action.roomID);
    return { ...state, pc: pc };
  }
  return state;
};

const ConnectionState = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, { pc: pc, socket: socket });

  return (
    <ConnectionContext.Provider
      value={{
        pc: state.pc,
        socket: state.socket,
        dataChannel: state.pc.dataChannel ?? null,
        connectionDispatch: dispatch,
      }}
    >
      {children}
    </ConnectionContext.Provider>
  );
};

export default ConnectionState;
