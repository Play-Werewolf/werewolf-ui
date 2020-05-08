import React from "react";

import PlayerList from "./PlayerList";

export default ({ game, state }) => {

    if (!state.game || !state.game.players)
        return null;

    const players = state.game.players.map(u => ({
        ...u,
        votes: 0,
        color: "skyblue", // TODO: Implement some avatar protocol
        highlight: null,
    }));

    return (
        <>
            <h1>Death announcements here (TODO: Set header)</h1>
            <PlayerList players={players} />
        </>
    );
}
