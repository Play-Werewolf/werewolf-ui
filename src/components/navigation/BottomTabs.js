import React from "react";
import styled from "styled-components";

import colors from "../../assets/colors";

export default () => (
    <BottomBar>
        Hello, world
    </BottomBar>
);

const BottomBar = styled.div`
position: fixed;
bottom: 0;
left: 0;
right: 0;
height: 48px;
background-color: ${colors.dark}
`;
