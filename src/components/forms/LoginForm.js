import React from "react";

import Textbox from "../common/Textbox";
import Button from "../common/Button";
import colors from "../../assets/colors.json";

export default ({ style }) => (
    <div style={{width: 250, maxWidth: "90%", textAlign: "center", ...style}}>
       <Textbox placeholder="Username" />
       <Textbox placeholder="Password" type="password" />
       <Button color={colors.main} style={{marginTop: 10}}>Play now</Button>
       
       <br/>
       <span style={{color: "#aaa", fontSize: 14}}>or</span>
       <br/>

       <Button color="#373B41" style={{marginTop: 4}}>Create an account</Button>
    </div>
);
