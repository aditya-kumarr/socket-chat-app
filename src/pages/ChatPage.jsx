import React, { useContext, useEffect, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import ChatNav from "../components/ChatNav";
import { MessageContainer } from "../components/MessageContainer";
import { MessageInput } from "../components/MessageInput";
import connectionContext from "../contexts/connectionContext/ConnectionContext";
import { Spage, SPageContainer } from "../styles";

const ChatPage = () => {
  const { dataChannel } = useContext(connectionContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!dataChannel) navigate("/");
  }, []);
  return (
    <Spage>
      <SPageContainer>
        <ChatNav />
        <MessageContainer />
        <MessageInput />
      </SPageContainer>
    </Spage>
  );
};

export default ChatPage;
