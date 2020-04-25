import React, { useState, useEffect } from "react";

import FlexContainer from "../../common/FlexContainer";
import BottomTabs from "../../navigation/BottomTabs";

import GameLobby from "./GameLobby";
import StatusOverlay from "./StatusOverlay";

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

    this.getStatus = this.getStatus.bind(this);
  }

  componentDidMount() {
    this.game = new GameManager({
      update: this.setState.bind(this),
      roomId: this.props.roomId,
      authentication: this.props.auth
    });
  }

  getStatus() {
    if (!this.state.connection || !this.state.connection.connected) {
      return this.state.connection.status || "Connecting to server...";
    }
    if (!this.state.session) {
      return "Authenticating...";
    }
    if (this.state.session.status !== "authenticated") {
      return "Authentication error";
    }
    if (!this.state.room || !this.state.room.status) {
      return "Joining room...";
    }
    if (this.state.room.status !== "connected") {
      return "Room connection error"; 
    }
    return null;
  }

  render() {
    const { game, state, player, log, connection, session, room } = this.state;
    const ChildComponent = state ? getComponent(state.state) : null;
    const errorMessage = this.getStatus();
    return (
      <FlexContainer>
      { errorMessage && <StatusOverlay text={errorMessage} />}

      <div style={{wordWrap: "break-word"}}>
        Connection status: {JSON.stringify(connection)}<br/>
        Session status: {JSON.stringify(session)}<br/>
        Room status: {JSON.stringify(room)}<br/>
        State: {JSON.stringify(state)}<br/>
        Game: {JSON.stringify(game)}<br/>
      </div>
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
