import React from "react";
import styled from "styled-components";
import colors from "../../assets/colors.json";

export default () => (
  <Overlay>
    <div style={{ flex: 0.6 }}>&nbsp;</div>
    <Announcement></Announcement>
    <div style={{ flex: 1 }}>&nbsp;</div>
  </Overlay>
);

const Overlay = styled.div`
  position: fixed;
  bottom: 0;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

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

const Announcement = () => (
  <CenterPanel>
    <div style={{ flex: 1 }}>&nbsp;</div>
    <div>
      We found <strong>Talisman</strong> dead in their house tonight.
    </div>
    <div style={{ flex: 1 }}>&nbsp;</div>
  </CenterPanel>
);
