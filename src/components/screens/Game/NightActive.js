import React, { useState, useEffect } from "react";

import PlayerList from "./PlayerList";

// TODO: This should be imported somehow from the server
const SpecialActions = {
    "Witch": { selectionType: "player", selectionCount: 2 },
    "Veteran": { selectionType: "boolean", label: "Alert?" },
};

const defaultAction = {
    selectionType: "player",
    selectionCount: 1,
}

export default ({ game, state }) => {
    
    const [selections, setSelections] = useState([]);

    const action = SpecialActions[state.player.role] || defaultAction; // ?

    const players = state.game.players.map(p => ({
        ...p,
        votes: 0,
        color: "skyblue", // TODO: implement avatar model
        highlight: null // TODO: highlight for werewolves (info from server)
    }));

    const addPlayerSelection = (uID) => {
        if (action.selectionType !== "player")
            return;
        
        setSelections(selections.concat([uID]));
    }

    // Sending the action when the selections change
    useEffect(() => {
        if (selections.length >= (action.selectionCount || 1)) {
            game.send_action(selections); // ?
        }
    }, [selections]);
    
    return (
        <PlayerList players={players} onClick={addPlayerSelection}/>
    );
};
