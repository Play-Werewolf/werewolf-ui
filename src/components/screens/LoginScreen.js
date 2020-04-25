import React from "react";

import Logo from "../common/Logo";
import LoginForm from "../forms/LoginForm";
import FlexContainer from "../common/FlexContainer";

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { setLogin } from "../../redux/actions/auth";

const LoginScreen = ({setLogin, history}) => {

    const doLogin = (username, password) => {
        localStorage.setItem("anonymous_nickname", username); // TODO: Change... This sucks
        setLogin({ type: "anonymous", nickname: username }); // TODO: Extend to work with real login
    };
    
    if (localStorage.getItem("anonymous_nickname")) {
        doLogin(localStorage.getItem("anonymous_nickname"), "");
    }

    return (
        <FlexContainer>
            <Logo style={{
                alignSelf: "center",
                marginTop: 50,
                minHeight: "30%",
            }}/>

            <LoginForm style={{alignSelf: "center"}} onLogin={doLogin} onSignup={() => history.push("/signup")}/>
        </FlexContainer>
    );
};

export default connect(null, {setLogin})(withRouter(LoginScreen));
