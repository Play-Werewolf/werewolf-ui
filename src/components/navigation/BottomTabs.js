import React from "react";
import styled from "styled-components";

import colors from "../../assets/colors";

export default () => (
    <BottomBar>
        <BottomTab>Hello</BottomTab>
        <BottomTab>Fucking</BottomTab>
        <BottomTab>World</BottomTab>
    </BottomBar>
);

const BottomBar = styled.div`
height: 48px;
width: 100%;
background-color: ${colors.dark};
color: white;
display: flex;
align-items: center;
justify-content: center;
`;

const BottomTab = styled.div`
flex: 1;
text-align: center;
`;