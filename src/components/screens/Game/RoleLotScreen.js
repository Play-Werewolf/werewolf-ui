import React from "react";

export default ({state, game}) => (
    <div>
        Your role: {JSON.stringify(game.player)}
    </div>
);
