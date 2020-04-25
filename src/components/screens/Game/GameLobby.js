import React from "react";

import PlayerList from "./PlayerList";

export default ({ game, state, player, log}) => {

    if (!game || !game.players)
        return null;

    const players = game.players.map(u => ({
        ...u,
        votes: 0,
        color: "skyblue", // TODO: Implement some avatar protocol
    }));

    return (
        <PlayerList players={players} />
    );
};
