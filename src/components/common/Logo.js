import React from "react";
import colors from "../../assets/colors.json";

const styles = {
  span: {
    fontFamily: "Werewolf",
    display: "inline-block",
    marginBottom: -10,
    color: colors.main,
  },
  container: {
    textAlign: "center",
    display: "inline-block",
  },
};

export default ({ fontSize, style, textOnly, overrideText, ...props }) => {
  return (
    <div style={{ ...styles.container, ...style }} {...props}>
      <span style={{ ...styles.span, fontSize: fontSize || 48 }}>
        {overrideText || "Werewolf"}
      </span>
      <br />
      {!textOnly && (
        <img
          src={require("../../assets/images/ww.jpg")}
          style={{ height: 150, maxHeidht: "20%" }}
          alt="Werewolf Logo"
        />
      )}
    </div>
  );
};
