import React from "react";

import Logo from "../common/Logo";
import SignupForm from "../forms/SignupForm";
import FlexContainer from "../common/FlexContainer";


const LoginScreen = () => {
    return (
        <FlexContainer>
            <Logo style={{
                alignSelf: "center",
                marginTop: 50,
                minHeight: "20%",
            }} textOnly overrideText="Join the town"/>

            <SignupForm style={{alignSelf: "center"}}/>
        </FlexContainer>
    );
};

export default LoginScreen;
