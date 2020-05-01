import React from "react";

import PlayerList from "./PlayerList";

export default ({ game, state }) => {

    if (!state.game || !state.game.players)
        return null;

    const players = state.game.players.map(u => ({
        ...u,
        votes: 0,
        color: "skyblue", // TODO: Implement some avatar protocol
        highlight: state.state.readyPlayers.includes(u.id) ? "green" : null,
    }));

    return (
        <PlayerList players={players} />
    );
};
