import React, { useState, useEffect } from "react";

import FlexContainer from "../../common/FlexContainer";
import BottomTabs from "../../navigation/BottomTabs";

import GameLobby from "./GameLobby";

import GameManager from "../../../api/game";

const getComponent = (state) => {
  switch (state) {
    case "LobbyState":
    case "DiscussionState":
        return GameLobby;
    default:
        return null;
  }
};

class GameScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      connection: {},
      session: null,
      room: {},
      game: {},
      state: {},
      player: {},
      log: []
    };
  }

  componentDidMount() {
    this.game = new GameManager({
      update: this.setState.bind(this),
      roomId: this.props.roomId,
      authentication: this.props.auth
    });
  }

  render() {
    const { game, state, player, log, connection, session, room } = this.state;
    const ChildComponent = state ? getComponent(state.state) : null;
    return (
      <FlexContainer>
      <pre>
        Connection status: {JSON.stringify(connection)}<br/>
        Session status: {JSON.stringify(session)}<br/>
        Room status: {JSON.stringify(room)}<br/>
        State: {JSON.stringify(state)}<br/>
        Game: {JSON.stringify(game)}<br/>
      </pre>
        {ChildComponent && (
          <ChildComponent game={game} state={state} player={player} log={log} />
        )}

        <div style={{ flex: 1 }}>&nbsp;</div>
        <BottomTabs />
      </FlexContainer>
    );
  }
}

export default GameScreen;

// export default ({ roomId }) => {
//   const [conn, setConnection] = useState(null);
//   const [connectionError, setConnectionError] = useState(null);
//   const [session, setSession] = useState({status: "not_authenticated"});
//   const [game, updateGame] = useState(null);
//   const [state, updateState] = useState(null);
//   const [player, updatePlayer] = useState(null);
//   const [log, updateLog] = useState([]);
  
//   window.uG = updateGame;
//   window.uS = updateState;
//   window.uP = updatePlayer;
//   window.uL = updateLog;

//   useEffect(() => {
//     connect("ws://127.0.0.1").then((conn) => {
//       setConnection(conn);
//       window.conn = conn; // TODO: Remove (for debug only)

//       console.log("A");
//       conn.on("close", () => {
//         alert("Connection closed");
//       });

//       conn.on("session_status", (args) => {
//         console.log("Got session status", args);
//         restore.saveSessionId(args[2]);

//         setSession({
//           status: args[1],
//           id: args[2],
//           nickname: args[5],
//         });
//       });

//     }).catch(() => {
//       setConnectionError("Could not connect to server");
//     });
//   }, []);
  
  
// };
