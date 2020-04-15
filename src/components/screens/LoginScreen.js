import React from "react";

import Logo from "../common/Logo";
import LoginForm from "../forms/LoginForm";
import FlexContainer from "../common/FlexContainer";

const LoginScreen = () => {
    return (
        <FlexContainer>
            <Logo style={{
                alignSelf: "center",
                marginTop: 50,
                minHeight: "30%",
            }}/>

            <LoginForm style={{alignSelf: "center"}}/>
        </FlexContainer>
    );
};

export default LoginScreen;
