export async function setOffer(pc, socket, id) {
  pc.onicecandidate = (event) => {
    event.candidate &&
      socket.emit("setOfferCandidate", event.candidate.toJSON());
  };
  pc.dataChannel = pc.createDataChannel("channel");
  pc.dataChannel.onopen = () => console.log("connected!");
  pc.dataChannel.onmessage = (message) => console.log(message.data);

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
  pc.dataChannel.onmessage = (e) => {
    dispatch({
      type: ACTIONS.RECEIVE_MESSAGE,
      payload: message,
    });
  };
}

export async function getOffer(pc, socket, id) {
  console.log(pc.localDescription);
  socket.emit("getOffer", id);
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
    pc.ondatachannel = (e) => {
      pc.dataChannel = e.channel;
      pc.dataChannel.onopen = (e) => console.log("connectinon OPENED!");
      pc.dataChannel.onmessage = (e) => console.log(e.data);
    };
    pc.dataChannel.onmessage = (e) => {
      dispatch({
        type: ACTIONS.RECEIVE_MESSAGE,
        payload: message,
      });
    };
  });
}
