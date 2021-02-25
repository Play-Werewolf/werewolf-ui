import React from "react";
import { withRouter } from "react-router-dom";
import BottomNavBar from "../navigation/BottomNavBar";
import FlexContainer from "../common/FlexContainer";

const Shop = ({  }) =>  {
    
    return (
    <FlexContainer>
        <h1>Shop here</h1>
        <div style={{ flex: 1 }}>&nbsp;</div>
        <BottomNavBar />
    </FlexContainer>
    );
};

export default withRouter(Shop);