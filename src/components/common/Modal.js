import React, { useReducer } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

import colors from "../../assets/colors.json";

import FlexContainer from "./FlexContainer";
import Overlay from "./Overlay";
import Button from "./Button";

import NotificationsView from "../NotificationsView";

export const Modal = {
  open: (contents) => {},
  hide: () => {},
};
window.Modal = Modal;
//style={{ display: "flex", flexDirection: "column" }}>

window.s = () =>
  Modal.open(
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <ModalHeader>Notifications:</ModalHeader>

      <div style={{ flex: 1, overflowY: "auto" }}>
        <NotificationsView
          data={[
            { color: "red", text: "You were attacked by a werewolf!" },
            {
              color: "lime",
              text: "You were attacked but someone fought off your attacker",
            },
            { color: "", text: "Good morning, town" },
          ]}
        />
      </div>

      <br />

      <OptionsBar>
        <div style={{ flex: 1 }}>&nbsp;</div>
        <Button
          style={{ backgroundColor: "#333" }}
          onClick={() => Modal.close()}
        >
          Close
        </Button>
      </OptionsBar>
    </div>
  );

export const ModalHeader = ({ children }) => (
  <div style={{ padding: 10 }}>
    <h3 style={{ margin: 0 }}>{children}</h3>
    <hr style={{ border: "1px solid #784825" }} />
  </div>
);

export const ModalProvider = () => {
  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    { content: null, key: 0 }
  );

  const openModal = (content) => {
    setState({
      content: content,
      key: Math.random(),
    });
  };

  const closeModal = () => {
    setState({ content: null });
  };

  Modal.open = openModal;
  Modal.close = closeModal;

  return (
    <AnimatePresence>
      {state.content && (
        <Overlay>
          <FlexContainer style={{ zIndex: 999, backgroundColor: "#000000aa" }}>
            <div style={{ flex: 1 }}>&nbsp;</div>
            <motion.div
              key={state.key}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              style={{
                height: 500,
                width: 400,
                maxHeight: "70%",
                maxWidth: "80%",
                backgroundColor: "#e2e2e2",
                alignSelf: "center",
                padding: 10,
                borderRadius: 10,
              }}
            >
              {state.content}
            </motion.div>

            <div style={{ flex: 1 }}>&nbsp;</div>
          </FlexContainer>
        </Overlay>
      )}
    </AnimatePresence>
  );
};

const AvatarImage = styled.img`
  vertical-align: middle;
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

const FlexBox = styled.div`
  overflow: auto;
  flex-direction: row;
  display: flex;
`;

const OptionsBar = styled.div`
  overflow: hidden;
  background-color: ${colors.main_background};
  display: flex;
`;
