import React from "react";
import styled from "styled-components";
import BottomBar from "./BottomBar";
import BottomTab from "./BottomTab";
import { NavLink } from "react-router-dom";

import colors from "../../assets/colors";

function BottomNavBar(props){
    console.log("bnb props" + props);
    return (
        <BottomBar>
            <NavLink to="/" style={{ flex:1, textAlign: "center", color: "white", textDecoration: "none" }}>
                <BottomTab>Game</BottomTab>
            </NavLink>
            <NavLink to="/shop" style={{ flex:1, textAlign: "center", color: "white", textDecoration: "none" }}>
                <BottomTab>Store</BottomTab>
            </NavLink>
            <NavLink to="/profile" style={{ flex:1, textAlign: "center", color: "white", textDecoration: "none" }}>
                <BottomTab>Profile</BottomTab>
            </NavLink>
        </BottomBar>
    );
}

export default BottomNavBar;