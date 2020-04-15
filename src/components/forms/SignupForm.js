import React from "react";

import Textbox from "../common/Textbox";
import Button from "../common/Button";
import colors from "../../assets/colors.json";

export default ({ style }) => (
    <div style={{width: 250, maxWidth: "90%", textAlign: "center", ...style}}>
       <Textbox placeholder="Username" />
       <Textbox placeholder="Email" type="email" />
       <Textbox placeholder="Password" type="password" />
       <Textbox placeholder="Confirm Password" type="password" />

       <Button color={colors.main} style={{marginTop: 10}}>Start playing</Button>       
    </div>
);
