import React, { useState } from "react";
import { withRouter } from "react-router-dom";

import colors from "../../assets/colors";

import Logo from "../common/Logo";
import Textbox from "../common/Textbox";
import Button from "../common/Button";
import FlexContainer from "../common/FlexContainer";
import BottomNavBar from "../navigation/BottomNavBar";

const LobbyScreen = ({ history }) => {
  const [roomId, setRoomId] = useState("");

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
          style={{
            textAlign: "center",
            letterSpacing: roomId ? 4 : undefined,
            width: "80%",
          }}
          type="number"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
        />
        <Button color={colors.main} style={{ width: "80%" }} onClick={() => history.push("/game/" + roomId)}>
          Join an existing party
        </Button>
      </div>

      <div style={{ flex: 1 }}>&nbsp;</div>

      <div
        style={{
          width: 250,
          alignSelf: "center",
          textAlign: "center",
          marginBottom: 55,
        }}
      >
        <span style={{ color: "#aaa", fontSize: 19 }}>
          Feeling dominant?
        </span>
        <span style={{ display: "block", height: 5 }}>&nbsp;</span>
        <Button color={colors.main} style={{ width: "50%" }} onClick={() => history.push("/game")}>
          Create a new party
        </Button>
      </div>
      <BottomNavBar />
    </FlexContainer>
  );
};

export default withRouter(LobbyScreen);
