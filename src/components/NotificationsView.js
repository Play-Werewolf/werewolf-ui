import React from "react";

export default ({ data }) => {
  console.log(data);
  return data.map((el, i) => (
    <div
      key={i}
      style={{
        alignSelf: "center",
        border: "1px solid #ccc",
        borderLeft: "3px solid " + el.color,
        padding: 7,
      }}
    >
      {el.text}
    </div>
  ));
};
