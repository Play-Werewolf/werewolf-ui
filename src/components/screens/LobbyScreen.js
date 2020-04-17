import React from "react";

import colors from "../../assets/colors";

import Logo from "../common/Logo";
import Textbox from "../common/Textbox";
import Button from "../common/Button";
import FlexContainer from "../common/FlexContainer";
import BottomTabs from "../navigation/BottomTabs";

const LoginScreen = () => {
  return (
    <FlexContainer>
      <div
        style={{
          height: 60,
        }}
      >
        &nbsp;
      </div>

      <Logo
        style={{
          alignSelf: "center",
          minHeight: "30%",
        }}
        overrideText="Werewolf"
      />

      <div
        style={{
          width: 250,
          textAlign: "center",
          alignSelf: "center",
          marginTop: 30,
        }}
      >
        <Textbox
          placeholder="Party number"
          style={{ textAlign: "center", letterSpacing: 4, width: "80%" }}
          type="number"
        />
        <Button color={colors.main} style={{ width: "80%" }}>
          Join an existing party
        </Button>

        <span style={{ display: "block", height: 15 }}>&nbsp;</span>
        <span style={{ color: "#aaa", fontSize: 20 }}>or</span>
        <span style={{ display: "block", height: 15 }}>&nbsp;</span>

        <Button color={colors.main}>Create a new party</Button>
      </div>


      <BottomTabs />
    </FlexContainer>
  );
};

export default LoginScreen;
