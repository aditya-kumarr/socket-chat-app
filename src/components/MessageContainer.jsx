import { useContext } from "react";
import styled from "styled-components";
import messageContext from "../../contexts/messageContext/MessageContext";
import TextBubble from "./TextBubble.style";

export function MessageContainer() {
  const { messages } = useContext(messageContext);
  console.log("message conatainer says:");
  console.log(messages);

  return (
    <Container id="text-container">
      {messages.map((message, index) => (
        <TextBubble key={index} author={message.author}>
          {message.text}
        </TextBubble>
      ))}
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  gap: 0.5em;
  flex-direction: column;
  padding: 0.25em;
  border: 1px solid grey;
  border-radius: 1em;
  overflow-y: scroll;
  overflow-x: hidden;
  height: 400px;
  width: 300px;
  & > *:first-child {
    margin-top: auto !important;
  }
`;
