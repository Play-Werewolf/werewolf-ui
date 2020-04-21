import React from "react";
import styled from "styled-components";
import colors from "../../assets/colors.json";

import Overlay from "./Overlay";

import { motion, AnimatePresence } from "framer-motion";

export default ({ children }) => (
  <Overlay>
    <div style={{ flex: 0.6 }}>&nbsp;</div>
    <AnimatePresence>
      <motion.div
        variants={{
          hidden: {
            scale: 0,
          },
          visible: {
            scale: 1,
          },
        }}
        initial="hidden"
        animate="visible"
        exit="hidden"
        transition={{ duration: 0.2 }}
      >
        <Announcement>{children}</Announcement>
      </motion.div>
    </AnimatePresence>
    <div style={{ flex: 1 }}>&nbsp;</div>
  </Overlay>
);

const CenterPanel = styled.div`
  display: flex;
  max-width: 80vw;
  flex-direction: column;
  width: 300px;
  max-height: 20vh;
  height: 100px;
  background-color: ${colors.dark}cc;
  color: white;
  border-radius: 10px;
  text-align: center;
  padding: 10px;
  font-size: 20px;
`;

const Announcement = ({ children }) => (
  <CenterPanel>
    <div style={{ flex: 1 }}>&nbsp;</div>
    <div>{children}</div>
    <div style={{ flex: 1 }}>&nbsp;</div>
  </CenterPanel>
);
