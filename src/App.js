import React from "react";

import { ModalProvider } from "./components/common/Modal";
import GameScreen from "./components/screens/Game/GameScreen";
import LoginScreen from "./components/screens/LoginScreen";
import LobbyScreen from "./components/screens/LobbyScreen";
import SignupScreen from "./components/screens/SignupScreen";

import { connect } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { setLogin } from "./redux/actions/auth";

function App({auth, setLogin}) {

  
  if (!auth.loggedIn) {
    if (localStorage.getItem("anonymous_nickname")) {
      setLogin({type: "anonymous", nickname: localStorage.getItem("anonymous_nickname")});
    }

    return (
      <Router>
        <Switch>
          <Route path="/signup">
          <SignupScreen />
          </Route>
          <Route>
            <LoginScreen />
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
          <Route path="/game/:roomId">
          <GameScreen auth={auth.auth} />
          </Route>
          <Route path="/game">
            <GameScreen auth={auth.auth} />
          </Route>
        </Switch>
      </Router>

      <ModalProvider />
    </div>
  );
}

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps, {setLogin})(App);
