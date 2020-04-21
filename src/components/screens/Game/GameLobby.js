import React from "react";

import PlayerList from "./PlayerList";

export default ({ game, state, player, log}) => {

    if (!game || !game.users)
        return null;

    const users = game.users.map(u => ({
        ...u,
        votes: 0,
        color: "white", // TODO: Implement some avatar protocol
    }));

    return (
        <PlayerList users={users} />
    );
};
