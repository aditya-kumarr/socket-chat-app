import { useContext, useState } from "react";
import ACTIONS from "../../contexts/Actions";
import messageContext from "../../contexts/messageContext/MessageContext";

export function MessageInput() {
  const [message, setMessage] = useState("");
  const { messageDispatch } = useContext(messageContext);
  const messegeSentHandler = (e) => {
    e.preventDefault();
    messageDispatch({
      type: ACTIONS.ADD_MESSAGE,
      payload: { text: message, author: "me" },
    });
  };

  return (
    <form onSubmit={(e) => messegeSentHandler(e)} id="message-form">
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        type="text"
        name="input-message"
        id="input-message"
      />
      <input type="submit" value="send" />
    </form>
  );
}
