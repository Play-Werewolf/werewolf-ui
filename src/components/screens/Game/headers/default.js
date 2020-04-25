import React from "react";

export default ({ children }) => {
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
      {children}
    </div>
  );
};
