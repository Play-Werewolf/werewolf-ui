import React from "react";
import {motion} from "framer-motion";

import FlexContainer from "../../common/FlexContainer";

export default ({text}) => {
  return (
    <FlexContainer
      style={{
        position: "fixed",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "#000000aa",
        zIndex: 9999,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <div style={{flex: 0.6}}>&nbsp;</div>

      <div style={{color: "white"}}>
        <h1>{text}</h1>
      </div>

      <div style={{flex: 1}}>&nbsp;</div>
    </FlexContainer>
  );
};
