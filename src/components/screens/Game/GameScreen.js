import React, { useState } from "react";

import FlexContainer from "../../common/FlexContainer";
import BottomTabs from "../../navigation/BottomTabs";

import GameLobby from "./GameLobby";

const getComponent = (state) => {
  switch (state) {
    case "LobbyState":
    case "DiscussionState":
        return GameLobby;
    default:
        return null;
  }
};

export default () => {
  const [game, updateGame] = useState(null);
  const [state, updateState] = useState(null);
  const [player, updatePlayer] = useState(null);
  const [log, updateLog] = useState([]);
  
  window.uG = updateGame;
  window.uS = updateState;
  window.uP = updatePlayer;
  window.uL = updateLog;
  
  const ChildComponent = state ? getComponent(state.state) : null;

  return (
    <FlexContainer>
      {ChildComponent && (
        <ChildComponent game={game} state={state} player={player} log={log} />
      )}

      <div style={{ flex: 1 }}>&nbsp;</div>
      <BottomTabs />
    </FlexContainer>
  );
};
