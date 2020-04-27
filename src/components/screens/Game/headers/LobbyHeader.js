import React from "react";
import Header from "./default";

import colors from "../../../../assets/colors.json";

import Button from "../../../common/Button";

const readyBtn = ({game}) => (
    <Button narrow color="green" onClick={() => game.ready()}>Ready</Button> 
);

const notReadyBtn = ({game}) => (
    <Button narrow color="#333" onClick={() => game.not_ready()}>Not ready</Button> 
);

export default ({ state, game }) => {
    const isReady = state.state.readyPlayers.includes(state.session.id);
    const Btn = isReady ? notReadyBtn : readyBtn;
    return (
        <Header>
            &nbsp;
            <span style={{flex: 1}}>
                <Btn game={game} />
            </span>
            
            <span style={{flex: 1, fontSize: "larger", fontWeight: "bold", textAlign: "center"}}>Room {state.room.roomId}</span>
            
            <span style={{flex: 1, textAlign: "right"}}>
                <Button narrow color={colors.main} onClick={() => game.leave_room()}>Leave</Button>
            </span>
            &nbsp;
        </Header>
    );
};
