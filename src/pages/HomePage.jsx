import React, { useContext, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import ACTIONS from "../contexts/Actions";
import connectionContext from "../contexts/connectionContext/ConnectionContext";
import { getOffer } from "../contexts/connectionContext/ConnectionHandler";
import messageContext from "../contexts/messageContext/MessageContext";
import { FormComponent } from "../Modal/FormComponent";
import { ModalContext } from "../Modal/ModalContext";
import { SButton } from "../styles";

const HomePage = () => {
  const { modalDispatch } = useContext(ModalContext);
  const [roomInput, setRoomInput] = useState("");
  const { connectionDispatch, pc, socket } = useContext(connectionContext);
  const { messageDispatch } = useContext(messageContext);
  return (
    <div>
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
                onSubmitAction={(data) => {
                  console.log("click");
                  getOffer(
                    pc,
                    socket,
                    data,
                    connectionDispatch,
                    messageDispatch
                  );
                }}
              />
            ),
          });
        }}
      >
        Join
      </SButton>
    </div>
  );
};

const RoomSelection = styled.div``;

export default HomePage;
