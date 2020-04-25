import React from "react";
import Header from "./default";

import colors from "../../../../assets/colors.json";

import Button from "../../../common/Button";

export default ({ state, game }) => (
    <Header>
        <span style={{flex: 1, fontSize: "larger", fontWeight: "bold", textAlign: "center"}}>Room {state.room.roomId}</span>
        <Button narrow color={colors.main} onClick={() => game.leave_room()}>Leave</Button>&nbsp;
    </Header>
);
