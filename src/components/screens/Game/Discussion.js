import React from "react";

import PlayerList from "./PlayerList";

const get_player_votes = (state) => {
    let votes = {};

    for (var i = 0; i < state.votes.length; i++) {
        votes[state.votes[i].target] = (votes[state.votes[i].target] || 0) + 1;
    }
    return votes;
}

const get_my_vote = (player_id, state) => {
    for (var i = 0; i < state.votes.length; i++) {
        if (state.votes[i].voter == player_id) {
            return state.votes[i].target;
        }
    }
}

export default ({game, state}) => {
    const votes = get_player_votes(state.state);
    const my_vote = get_my_vote(state.player.id, state.state);

    const players = state.game.players.map(u => ({
        ...u,
        votes: votes[u.id] || 0,
        color: "skyblue", // TODO: Implement some avatar protocol
        highlight: u.id === my_vote,
    }));

    const on_vote = (player_id) => {
        if (player_id === my_vote || player_id === state.player.id) {
            game.unvote_player();
        }
        else {
            game.vote_player(player_id);
        }
    }

    return (
        <PlayerList players={players} onClick={on_vote} />
    );
};
