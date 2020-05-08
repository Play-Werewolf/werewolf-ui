import React from "react";

export default ({ left, center, right }) => {
  return (
    <div
      style={{
        borderBottom: "1px solid #ccc",
        height: 40,
        maxHeight: "8%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      &nbsp;
      <span style={{flex: 1}}>
        {left}
      </span>
      
      <span style={{flex: 1, textAlign: "center"}}>
        {center}  
      </span>
      
      <span style={{flex: 1, textAlign: "right"}}>
        {right}
      </span>
      &nbsp;
    </div>
  );
};
