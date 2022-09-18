import { useContext } from "react";
import styled from "styled-components";
import messageContext from "../contexts/messageContext/MessageContext";
import TextBubble from "./TextBubble.style";

export function MessageContainer() {
  const { messages } = useContext(messageContext);

  return (
    <Container>
      {messages.map((message, index) => (
        <TextBubble key={index} author={message.author}>
          {message.text}
        </TextBubble>
      ))}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 90%;
  gap: 0.5em;
  flex-direction: column;
  padding: 0.25em;
  border: 1px solid grey;
  border-radius: 1em;
  overflow-y: scroll;
  overflow-x: hidden;
  /* min-height: 100vh; */
  & > *:first-child {
    margin-top: auto !important;
  }
  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  & {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }
`;
