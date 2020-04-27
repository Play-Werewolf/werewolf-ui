import React from "react";

import PlayerList from "./PlayerList";

export default ({ game, state, player, log}) => {

    if (!game || !game.players)
        return null;

    console.log(game.players, state.readyPlayers, state.readyPlayers.includes(game.players[0].id));

    const players = game.players.map(u => ({
        ...u,
        votes: 0,
        color: "skyblue", // TODO: Implement some avatar protocol
        highlight: state.readyPlayers.includes(u.id) ? "green" : null,
    }));

    return (
        <PlayerList players={players} />
    );
};
