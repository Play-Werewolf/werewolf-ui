import React from "react";

import Logo from "../../common/Logo";

export default () => (
    <div style={{flex: 1, display: "flex", flexDirection: "column"}}>
        <div style={{flex: 1}}>&nbsp;</div>
        <div style={{textAlign: "center"}}>
            <Logo overrideText="Game starting!"/>
            <br/>
            <br/>
            <strong>Prepare for murder...</strong> {/*TODO: Enter random phrase here*/}
        </div>
        <div style={{flex: 1}}>&nbsp;</div>
    </div>
);
