import ACTIONS from "../contexts/messageContext/MessageActions";
import "./App.css";
import { MessageContainer } from "./components/MessageContainer";
import { MessageInput } from "./components/MessageInput";

function App() {
  console.log("re-rendered");
  return (
    <div className="App">
      <button id="start-btn">Generate Room</button>
      <MessageContainer />
      <MessageInput />
    </div>
  );
}

export default App;
