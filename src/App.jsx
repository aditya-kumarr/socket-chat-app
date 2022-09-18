import styled from "styled-components";
import Router from "./Router";
import { MessageContainer } from "./components/MessageContainer";
import { MessageInput } from "./components/MessageInput";
import ModalRenderer from "./Modal/ModalRenderer";
import ChatPage from "./pages/ChatPage";
import HomePage from "./pages/HomePage";
import { Link } from "react-router-dom";

function App() {
  console.log("re-rendered");
  return (
    <AppContainer>
      <Router />
      <ModalRenderer />
      <Link to="/chatpage">hello</Link>
    </AppContainer>
  );
}

const AppContainer = styled.main`
  background-color: #242424;

  height: 100vh;
`;

export default App;
