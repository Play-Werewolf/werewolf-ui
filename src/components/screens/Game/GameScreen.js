import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";

import FlexContainer from "../../common/FlexContainer";
import BottomTabs from "../../navigation/BottomTabs";
import LobbyHeader from "./headers/LobbyHeader";

import GameLobby from "./GameLobby";
import GameInit from "./GameInit";
import NightTransition from "./NightTransition";
import DayTransition from "./DayTransition";
import SeparatedNight from "./SeparatedNight";
import NightInactive from "./NightInactive";
import StatusOverlay from "./StatusOverlay";
import DeathAnnouncements from "./DeathAnnouncements";

import GameManager from "../../../api/game";
import RoleLotScreen from "./RoleLotScreen";

const getComponent = (state) => {
  switch (state) {
    case "LobbyState":
      return GameLobby;
    case "GameInitState":
      return GameInit;
    case "RolesLotState":
      return RoleLotScreen;
    case "NightTransitionState":
      return NightTransition;
    case "SeparatedNightState":
      return SeparatedNight;
    case "GoodNightState":
      return NightInactive;
    case "DayTransitionState":
      return DayTransition;
    case "DeathAnnounceState":
      return DeathAnnouncements;
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

const Screens = {
  NOTIFICATION: 0,
  GAME_VIEW: 1,
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

      screen: Screens.GAME_VIEW,
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

    window.debug = () => {
      this.setState({
        state: {state: "SeparatedNightState", timer: 30}
      })
    }
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

  render_game_screen(game, state) {
    const ChildComponent = state ? getComponent(state.state) : null;

    return (
      <>
        {ChildComponent && <ChildComponent game={this.game} state={this.state} />}
      </>
    )
  
  }
  
  render_notification_screen(game, state) {
    return (
      <>
        <div>This is the notification view</div>
      </>
    );
  }

  get_render_screen(screen_name, game, state) {
    switch (this.state.screen) {
      case Screens.GAME_VIEW:
        return this.render_game_screen(game, state);
      case Screens.NOTIFICATION:
        return this.render_notification_screen(game, state);
      default:
        return <div>Fuck you shitty programmer</div>;
    }
  }
  
  render() {
    const { game, state } = this.state;
    const errorMessage = this.getStatus();
    if (errorMessage) {
      return <StatusOverlay text={errorMessage} />;
    }

    const Header = state ? getHeader(state.state) : null;
    const innerElement = this.get_render_screen(this.state.screen, game, state);
    
    return (
      <FlexContainer>
        {Header && <Header state={this.state} game={this.game} />}
        {innerElement}
        <div style={{ flex: 1 }}>&nbsp;</div>
        <BottomTabs />
      </FlexContainer>
    );
  }
}

export default withRouter(GameScreen);
