import { useContext, useState } from "react";
import ACTIONS from "../contexts/messageContext/MessageActions";
import messageContext from "../contexts/messageContext/MessageContext";
import "./App.css";
import { MessageContainer } from "./components/MessageContainer";

function App() {
  const [message, setMessage] = useState("");
  const { dispatch } = useContext(messageContext);

  const messegeSendHandler = (e) => {
    e.preventDefault();
    dispatch({
      type: ACTIONS.ADD_MESSAGE,
      payload: { text: message, author: "me" },
    });
    // make a new text buble component and append it to the chilren array of thr message container
  };

  return (
    <div className="App">
      <button id="start-btn">Generate Room</button>
      <MessageContainer />
      <form onSubmit={messegeSendHandler} id="message-form">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          type="text"
          name="input-message"
          id="input-message"
        />
        <input type="submit" value="send" />
      </form>
    </div>
  );
}

export default App;
