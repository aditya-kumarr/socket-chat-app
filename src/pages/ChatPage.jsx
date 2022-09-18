import React from "react";
import { MessageContainer } from "../components/MessageContainer";
import { MessageInput } from "../components/MessageInput";
import { Spage, SPageContainer } from "../styles";

const ChatPage = () => {
  return (
    <Spage>
      <SPageContainer>
        <MessageContainer />
        <MessageInput />
      </SPageContainer>
    </Spage>
  );
};

export default ChatPage;
