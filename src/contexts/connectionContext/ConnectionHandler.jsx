import ACTIONS from "../Actions";

export const setOffer = async (
  pc,
  socket,
  id,
  dispatchMessage,
  dispatchConnection
) => {
  pc.onicecandidate = (event) => {
    event.candidate &&
      socket.emit("setOfferCandidate", event.candidate.toJSON());
  };
  const dataChannel = pc.createDataChannel("channel");
  dataChannel.onopen = () => console.log("connected!");
  dataChannel.onmessage = (message) => console.log(message.data);

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
    console.log(answer);
  });
  socket.on("getAnswerCandidate", (candidateData) => {
    candidateData.forEach((cand) => {
      const candidate = new RTCIceCandidate(cand);
      pc.addIceCandidate(candidate);
    });
    console.log("got answer candidates");
  });
  dataChannel.onmessage = (e) => {
    dispatchMessage({
      type: ACTIONS.RECEIVE_MESSAGE,
      payload: { text: e.data, author: "other" },
    });
  };
  dispatchConnection({
    type: ACTIONS.SEND_OFFER,
    payload: { pc, dataChannel, id },
  });
};

export async function getOffer(
  pc,
  socket,
  id,
  dispatchConnection,
  dispatchMessage
) {
  const dataChannelConnected = new Promise((resolve, reject) => {
    pc.ondatachannel = (e) => {
      console.log("should be first");
      if (!e.channel) {
        reject("e doesn't exists");
      } else {
        resolve(e.channel);
      }
    };
  });

  socket.emit("getOffer", id.roomID);
  console.log("called get offer");

  socket.on("offer", async (offer) => {
    console.log("offer event called");
    pc.onicecandidate = (event) => {
      event.candidate &&
        socket.emit("setAnswerCandidate", event.candidate.toJSON());
    };
    const offerDescription = offer;
    await pc.setRemoteDescription(new RTCSessionDescription(offerDescription));

    const answerDescription = await pc.createAnswer();
    console.log("setting local description");
    await pc.setLocalDescription(answerDescription);
    const answer = {
      type: answerDescription.type,
      sdp: answerDescription.sdp,
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
  dataChannel.onopen = (e) => console.log("connectinon OPENED!");
  dataChannel.onmessage = (e) => console.log(e.data);
  dataChannel.onmessage = (e) => {
    console.log("e.data");
    console.log(e.data);
    dispatchMessage({
      type: ACTIONS.RECEIVE_MESSAGE,
      payload: { text: e.data, author: "other" },
    });

    console.log(dataChannel);
    console.log("should be last");
  };
  console.log(dataChannel);
  dispatchConnection({
    type: ACTIONS.RECEIVE_OFFER,
    payload: { pc, dataChannel, id },
  });
  socket.onerror((message) => console.log(message));
}
