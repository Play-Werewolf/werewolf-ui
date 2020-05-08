import React from "react";
import Header from "./default";

import colors from "../../../../assets/colors.json";

import Button from "../../../common/Button";

function getTimeMark (state) {
    if ((["NightTransitionState", "ConcurrentNightState", "SeparatedNightState", "GoodNightState"]).includes(state)) {
        return <span style={{color: "skyblue", backgroundColor: "black"}}>Night</span>;
    }
    return <span style={{color: "yellow", backgroundColor: "skyblue"}}>Day</span>;
}

// TODO: Export to server side (then request from client)
function getStateNameString(state) {
    switch (state) {
        case "GameInitState":
            return "Game is starting...";
        case "RolesLotState":
            return "Roles are being shffeled";
        case "NightTransitionState":
        case "SeparatedNightState":
        case "ConcurrentNightState":
        case "GoodNightState":
            return "Good night, village";
        case "DayTransitionState":
            return "Good morning, village";
        case "DeathAnnounceState":
            return "DEBUG: Shouldn't happen"; // TODO: Make sure this doesn't happen
        case "DiscussionState":
            return "Discussion";
        case "TrialState":
            return "Trial";
        default:
            return "OOPS"; // TODO: Make sure this doesn't happen
    }
}

export default ({ state, game }) => {
    return (
        <Header
            left={
                getTimeMark(state.state.state)
            }
            center={
                <span style={{flex: 1, fontSize: "larger", fontWeight: "bold", textAlign: "center"}}>
                    
                </span>
            }
            right={
                <Button narrow color={colors.main} onClick={() => game.leave_room()}>Leave</Button>
            }
        />
    );
};
