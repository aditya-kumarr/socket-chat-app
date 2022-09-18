import ACTIONS from "../Actions";

export const setOffer = async (
  pc,
  socket,
  id,
  messageDispatch,
  connectionDispatch,
  toastDispatch,
  navigate
) => {
  const dataChannel = pc.createDataChannel("channel");
  dataChannel.onopen = () => {
    toastDispatch({
      type: "SHOW",
      message: "Connected",
    });
    navigate("/chatpage");
  };

  // Create offer
  const offerDescription = await pc.createOffer();
  await pc.setLocalDescription(offerDescription);

  const offer = {
    sdp: offerDescription.sdp,
    type: offerDescription.type,
  };

  socket.emit("setOffer", offer, id);

  socket.on("getAnswer", (answer) => {
    if (!pc.currentRemoteDescription) {
      const answerDescription = new RTCSessionDescription(answer);
      pc.setRemoteDescription(answerDescription);
    }
  });
  socket.on("getAnswerCandidate", (candidateData) => {
    candidateData.forEach((cand) => {
      const candidate = new RTCIceCandidate(cand);
      pc.addIceCandidate(candidate);
    });
  });
  dataChannel.onmessage = (e) => {
    messageDispatch({
      type: ACTIONS.RECEIVE_MESSAGE,
      payload: { text: e.data, author: "other" },
    });
  };
  dataChannel.onclose = (e) => {
    toastDispatch({
      type: "SHOW",
      message: "Disconnected",
    });
    connectionDispatch({
      type: ACTIONS.DISCONNECT,
    });

    // need to change the pc.peerConnection in this script
    navigate("/");
  };
  connectionDispatch({
    type: ACTIONS.SEND_OFFER,
    payload: { pc, dataChannel, id },
  });
  pc.onicecandidate = (event) => {
    event.candidate &&
      socket.emit("setOfferCandidate", event.candidate.toJSON());
  };
  socket.onerror((message) =>
    toastDispatch({ type: "SHOW", message: message })
  );
};

export async function getOffer(
  pc,
  socket,
  id,
  messageDispatch,
  connectionDispatch,
  toastDispatch,
  navigate
) {
  const dataChannelConnected = new Promise((resolve, reject) => {
    pc.ondatachannel = (e) => {
      if (!e.channel) {
        reject("e doesn't exists");
      } else {
        resolve(e.channel);
      }
    };
  });

  socket.emit("getOffer", id.roomID);

  socket.on("offer", async (offer) => {
    const offerDescription = offer;
    await pc.setRemoteDescription(new RTCSessionDescription(offerDescription));

    const answerDescription = await pc.createAnswer();
    await pc.setLocalDescription(answerDescription);
    const answer = {
      type: answerDescription.type,
      sdp: answerDescription.sdp,
    };
    pc.onicecandidate = (event) => {
      event.candidate &&
        socket.emit("setAnswerCandidate", event.candidate.toJSON());
    };

    // await callDoc.update({ answer });
    socket.emit("setAnswer", answer);
    socket.on("getOfferCandidate", (offerCandidates) => {
      offerCandidates.forEach((offerCandidate) => {
        pc.addIceCandidate(new RTCIceCandidate(offerCandidate));
      });
    });
  });
  const dataChannel = await dataChannelConnected;
  dataChannel.onopen = (e) => {
    toastDispatch({
      type: "SHOW",
      message: "Connected",
    });
    navigate("/chatpage");
  };
  dataChannel.onmessage = (e) => {
    messageDispatch({
      type: ACTIONS.RECEIVE_MESSAGE,
      payload: { text: e.data, author: "other" },
    });
  };
  dataChannel.onclose = (e) => {
    toastDispatch({
      type: "SHOW",
      message: "Disconnected",
    });
    connectionDispatch({
      type: ACTIONS.DISCONNECT,
    });
    navigate("/");
  };
  connectionDispatch({
    type: ACTIONS.RECEIVE_OFFER,
    payload: { pc, dataChannel, id },
  });

  socket.onerror((message) =>
    toastDispatch({ type: "SHOW", message: message })
  );
}
