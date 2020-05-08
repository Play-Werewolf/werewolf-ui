import React, { useState, useEffect } from "react";

import PlayerList from "./PlayerList";
import GameAnnouncement from "../../common/GameAnnouncement";

export default ({ game, state }) => {

    if (!state.game || !state.game.players)
        return null;

    const players = state.game.players.map(u => ({
        ...u,
        votes: 0,
        color: "skyblue", // TODO: Implement some avatar protocol
        highlight: null,
    }));

    const announcement = state.state.callout;

    const [my_state, setState] = useState({callout: "", key: 0});

    useEffect(() => {
        setState({
            callout: announcement,
            key: Math.random() // For re-animating the announcement window
        })
    }, [announcement]);

    return (
        <>
            {my_state.key && <GameAnnouncement key={my_state.key}>{my_state.callout}</GameAnnouncement>}

            <h1>Death announcements here (TODO: Set header)</h1>
            <PlayerList players={players} />
        </>
    );
}
