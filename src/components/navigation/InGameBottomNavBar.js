import React from "react";
import BottomBar from "./BottomBar";
import BottomTab from "./BottomTab";
import colors from "../../assets/colors";

export default ( { changeScreen }) => (
    <BottomBar>
        <div style = {{ flex:1, textAlign: "center"}} onClick = {() => changeScreen(1)}>
            <BottomTab>Town</BottomTab>
        </div>
        <div style = {{ flex:1, textAlign: "center"}} onClick = {() => changeScreen(0)}>
            <BottomTab>Notifications</BottomTab>
        </div>
    </BottomBar>
);