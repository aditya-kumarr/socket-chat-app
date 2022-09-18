import { useContext, useRef, useState } from "react";
import styled from "styled-components";
import ACTIONS from "../contexts/Actions";
import connectionContext from "../contexts/connectionContext/ConnectionContext";
import messageContext from "../contexts/messageContext/MessageContext";

export function MessageInput() {
  const [message, setMessage] = useState("");
  const { messageDispatch } = useContext(messageContext);
  const { dataChannel } = useContext(connectionContext);

  const inputField = useRef(null);
  const messegeSentHandler = (e) => {
    e.preventDefault();
    messageDispatch({
      type: ACTIONS.ADD_MESSAGE,
      payload: { text: message, author: "me" },
    });
    try {
      dataChannel.send(message);
    } catch (error) {
      console.log(error);
    }
    setMessage("");
    inputField.current.focus();
  };

  return (
    <MessageForm onSubmit={(e) => messegeSentHandler(e)}>
      <MessageField
        autoComplete="off"
        ref={inputField}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        type="text"
        name="input-message"
      />
      <SendBtn type="submit">send</SendBtn>
    </MessageForm>
  );
}

export const SendBtn = styled.button`
  cursor: pointer;
  border-color: #646cff;
  outline-color: #646cff;
  outline-style: double;
  border: 1px solid transparent;
  border-radius: 0.5em;
`;

export const MessageField = styled.input`
  padding: 0.2em;
  border-radius: 5em;
  border: 1px solid transparent;
  /* min-width: 250px; */
  width: 100%;
  &:focus,
  &:focus-visible {
    border-color: #646cff;
    outline-color: #646cff;
    outline-style: double;
    border: 1px solid transparent;
  }
`;

export const MessageForm = styled.form`
  display: flex;
  margin-top: 1em;
  justify-content: space-between;
  gap: 0.5em;
  width: 100%;
`;
