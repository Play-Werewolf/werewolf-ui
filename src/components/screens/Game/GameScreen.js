import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";

import FlexContainer from "../../common/FlexContainer";
import BottomTabs from "../../navigation/BottomTabs";
import LobbyHeader from "./headers/LobbyHeader";

import GameLobby from "./GameLobby";
import GameInit from "./GameInit";
import StatusOverlay from "./StatusOverlay";

import GameManager from "../../../api/game";
import RoleLotScreen from "./RoleLotScreen";

const getComponent = (state) => {
  switch (state) {
    case "LobbyState":
    case "DiscussionState":
      return GameLobby;
    case "GameInitState":
      return GameInit;
    case "RolesLotState":
      return RoleLotScreen;
    default:
      return null;
  }
};

const getHeader = (state) => {
  switch (state) {
    case "LobbyState":
      return LobbyHeader;
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
      log: [],
    };

    this.getStatus = this.getStatus.bind(this);

    this.roomId = props.match.params.roomId || null;
  }

  componentDidMount() {
    this.game = new GameManager({
      update: this.setState.bind(this),
      roomId: this.roomId,
      authentication: this.props.auth,
    });

    this.game.on_leave = () => {
      this.props.history.push("/");
    };
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
    if (this.state.room.status === "error") {
      return this.state.room.error;
    }
    if (this.state.room.status !== "connected") {
      return "Room connection error";
    }
    return null;
  }

  render() {
    const { game, state, player, log, connection, session, room } = this.state;
    const ChildComponent = state ? getComponent(state.state) : null;
    const Header = state ? getHeader(state.state) : null;
    const errorMessage = this.getStatus();

    if (errorMessage) {
      return <StatusOverlay text={errorMessage} />;
    }

    // For debugging. TODO: Remove!
    // return (
    //   <FlexContainer>
    //     <GameInit state={this.state} game={this.game}/>
    //   </FlexContainer>
    // )

    console.log(this.state);

    return (
      <FlexContainer>
      
        {/*<div style={{wordWrap: "break-word"}}>
        Connection status: {JSON.stringify(connection)}<br/>
        Session status: {JSON.stringify(session)}<br/>
        Room status: {JSON.stringify(room)}<br/>
        State: {JSON.stringify(state)}<br/>
        Game: {JSON.stringify(game)}<br/>
        </div>*/}
        {Header && <Header state={this.state} game={this.game} />}
        {ChildComponent && <ChildComponent game={game} state={state} player={player} log={log} />}

        <div style={{ flex: 1 }}>&nbsp;</div>
        <BottomTabs />
      </FlexContainer>
    );
  }
}

export default withRouter(GameScreen);

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
