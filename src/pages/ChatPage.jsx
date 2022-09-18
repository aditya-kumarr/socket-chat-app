import React from "react";
import ChatNav from "../components/ChatNav";
import { MessageContainer } from "../components/MessageContainer";
import { MessageInput } from "../components/MessageInput";
import { Spage, SPageContainer } from "../styles";

const ChatPage = () => {
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
