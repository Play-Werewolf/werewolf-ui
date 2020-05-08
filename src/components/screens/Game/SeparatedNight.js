import React from "react";

import NightActive from "./NightActive";
import NightInactive from "./NightInactive";

export default ({ game, state }) => {
    console.log(state.player.id, state.state.activePlayers);

    if (state.state.activePlayers.includes(state.player.id)) {
        return <NightActive game={game} state={state} />;
    }

    return <NightInactive game={game} state={state} />;
};
