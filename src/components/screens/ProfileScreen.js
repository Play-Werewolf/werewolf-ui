import React from "react";
import { withRouter } from "react-router-dom";
import BottomNavBar from "../navigation/BottomNavBar";
import FlexContainer from "../common/FlexContainer";

const ProfilePage = ({  }) =>  {
    
    return (
    <FlexContainer>
        <h1>Profile Page here</h1>
        <div style={{ flex: 1 }}>&nbsp;</div>
        <BottomNavBar />
    </FlexContainer>
    );
};

export default withRouter(ProfilePage);