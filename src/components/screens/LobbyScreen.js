import React from "react";

import colors from "../../assets/colors";

import Logo from "../common/Logo";
import Textbox from "../common/Textbox";
import Button from "../common/Button";
import FlexContainer from "../common/FlexContainer";

const LoginScreen = () => {
  return (
    <FlexContainer>
      <div
        style={{
          height: 30,
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

      <div style={{ width: 250, textAlign: "center", alignSelf: "center", marginTop: 30 }}>
        <Textbox placeholder="Party number" style={{ textAlign: "center", letterSpacing: 4 }} type="number" />
        <Button color={colors.main}>Join an existing party</Button>
        
        <br/><br/>
          <span style={{ color: "#aaa", fontSize: 20 }}>or</span>
        <br/><br/>

        <Button color={colors.main}>Create a new party</Button>
      </div>
    </FlexContainer>
  );
};

export default LoginScreen;
