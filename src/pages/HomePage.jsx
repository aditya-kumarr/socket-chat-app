import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import { v4 as uuid } from "uuid";
import ACTIONS from "../contexts/Actions";
import connectionContext from "../contexts/connectionContext/ConnectionContext";
import {
  getOffer,
  setOffer,
} from "../contexts/connectionContext/ConnectionHandler";
import messageContext from "../contexts/messageContext/MessageContext";
import { FormComponent } from "../Modal/FormComponent";
import { ModalContext } from "../Modal/ModalContext";
import { SButton, SInput, Spage, SPageContainer } from "../styles";
import { ToastContext } from "../Toast/ToastContext";

const HomePage = () => {
  const { modalDispatch } = useContext(ModalContext);
  const [roomInput, setRoomInput] = useState("");
  const { connectionDispatch, pc, socket } = useContext(connectionContext);
  const { messageDispatch } = useContext(messageContext);
  const { toastDispatch } = useContext(ToastContext);
  const navigate = useNavigate();

  const createRoomHanlder = () => {
    const roomID = uuid();
    setRoomInput(roomID);
    setOffer(
      pc,
      socket,
      roomID,
      messageDispatch,
      connectionDispatch,
      toastDispatch,
      navigate
    );
  };
  const joinRoomHandler = (data) => {
    console.log("click");
    getOffer(
      pc,
      socket,
      data,
      messageDispatch,
      connectionDispatch,
      toastDispatch,
      navigate
    );
  };
  return (
    <Spage>
      <SPageContainer>
        <SButton
          onClick={() => {
            modalDispatch({
              type: "SHOW",
              message: (
                <FormComponent
                  buttonName="Join"
                  formArr={[
                    {
                      label: "RoomID",
                      name: "roomID",
                      type: "text",
                    },
                  ]}
                  formTitle="paste the roomID here"
                  heading="JOIN"
                  onSubmitAction={joinRoomHandler}
                />
              ),
            });
          }}
        >
          Join
        </SButton>
        <SButton onClick={createRoomHanlder}>Create A Room</SButton>
        <SInput readOnly value={roomInput} />
      </SPageContainer>
    </Spage>
  );
};

const RoomSelection = styled.div`
  /* width: 300px; */
  /* height: 500px; */
`;

export default HomePage;
