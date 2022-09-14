import { useState } from "react";
import "./App.css";

function MessageContainer({ children }) {
  return (
    <div className="card" id="text-container">
      {children}
    </div>
  );
}

function App() {
  const [message, setMessage] = useState("");

  const messegeSendHandler = (e) => {
    e.preventDefault();

    // make a new text buble component and append it to the chilren array of thr message container
    
  };

  return (
    <div className="App">
      <button id="start-btn">Generate Room</button>
      <MessageContainer children={message} />
      <form onClick={messegeSendHandler} id="message-form">
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
