import React, { useContext } from "react";
import styled from "styled-components";
import ACTIONS from "../contexts/Actions";
import connectionContext from "../contexts/connectionContext/ConnectionContext";
import { ModalContext } from "../Modal/ModalContext";
import PropmtComponent from "../Modal/PropmtComponent";
import { SLable } from "../styles";

const ChatNav = () => {
  const { pc, connectionDispatch } = useContext(connectionContext);
  const { modalDispatch } = useContext(ModalContext);
  const hanldeBackPress = () => {
    modalDispatch({
      type: "SHOW",
      message: (
        <PropmtComponent
          options={{ yes: "yes", no: "no" }}
          onPrompt={handleOnChatLeave}
          title="you sure you wanna leave"
        />
      ),
    });
  };
  const handleOnChatLeave = (propmt) => {
    // redirect to the '/'
    if (propmt) {
      pc.close();
    }
    modalDispatch({
      type: "HIDE",
    });
  };
  return (
    <NavContainer>
      <button onClick={hanldeBackPress}>&larr;</button>
      <STitle>hello</STitle>
    </NavContainer>
  );
};
const NavContainer = styled.nav`
  display: flex;
  width: 100%;
  padding: 0.2em 1em;
  border: 1px solid grey;
  border-radius: 1em;
  margin-bottom: 0.5em;
  text-align: center;
`;
const STitle = styled.h2`
  margin: 0;
  width: 100%;
  text-align: center;
  font-size: 1em;
`;

export default ChatNav;
