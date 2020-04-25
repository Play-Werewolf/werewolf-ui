import React, { useState } from "react";

import Textbox from "../common/Textbox";
import Button from "../common/Button";
import colors from "../../assets/colors.json";

export default ({ style, onLogin, onSignup }) => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div style={{width: 250, maxWidth: "90%", textAlign: "center", ...style}}>
        <Textbox placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <Textbox placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} type="password" />

        <Button color={colors.main} style={{marginTop: 10}} onClick={() => onLogin(username, password)}>Play now</Button>
        
        <br/>
        <span style={{color: "#aaa", fontSize: 14}}>or</span>
        <br/>

        <Button color="#373B41" style={{marginTop: 4}} onClick={onSignup}>Create an account</Button>
        </div>
    );
};