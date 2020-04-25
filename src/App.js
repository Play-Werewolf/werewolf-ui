import React from "react";

import { ModalProvider } from "./components/common/Modal";
import GameScreen from "./components/screens/Game/GameScreen";
import LoginScreen from "./components/screens/LoginScreen";
import LobbyScreen from "./components/screens/LobbyScreen";
import SignupScreen from "./components/screens/SignupScreen";

import { connect } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App({auth}) {
  if (!auth.loggedIn) {
    return (
      <Router>
        <Switch>
          <Route exact path="/">
            <LoginScreen />
          </Route>
          <Route path="/signup">
            <SignupScreen />
          </Route>
        </Switch>
      </Router>
    )
  }

  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/">
            <LobbyScreen />
          </Route>
          <Route path="/play">
            <GameScreen auth={auth} />
          </Route>
        </Switch>
      </Router>

      <ModalProvider />
    </div>
  );
}

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps)(App);
