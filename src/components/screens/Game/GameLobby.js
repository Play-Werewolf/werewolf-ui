import React from "react";
import styled from "styled-components";

import colors from "../../../assets/colors.json";
import FlexContainer from "../../common/FlexContainer";
import BottomTabs from "../../navigation/BottomTabs";
import Announcement from "../../common/GameAnnouncement";

const randomOctet = () =>
  Math.round(Math.random() * 256)
    .toString(16)
    .padStart(2, "0");
const randomHSL = () =>
  "hsl(%s, 52%, 76%)".replace("%s", Math.round(Math.random() * 360));
const randomColor = () => "#" + randomOctet() + randomOctet() + randomOctet();

export default () => {
  return (
    <FlexContainer>
      <div style={{ maxWidth: 800, alignSelf: "center" }}>
        {Array.from(Array(19).keys()).map((x) => (
          <CharacterBox
            background={randomHSL()}
            highlight={x === 10}
          ></CharacterBox>
        ))}
      </div>

      <div style={{ flex: 1 }}>&nbsp;</div>
      <BottomTabs />

      {/*<Announcement>Hello world!</Announcement> */}
    </FlexContainer>
  );
};

const CharacterBox = ({ highlight, background, children }) => (
  <CharacterOutline highlight={highlight}>
    <CharacterFrame highlight={highlight} style={{ background }}>
      <img
        style={{ width: "65%", height: "65%", margin: "auto" }}
        alt="nope"
        src="https://camo.githubusercontent.com/008e1ec5eaa29cf767a0a9bc784ec5f8751d0b6e/68747470733a2f2f707265766965772e6269746d6f6a692e636f6d2f6176617461722d6275696c6465722d76332f707265766965772f686561643f7363616c653d332667656e6465723d32267374796c653d3526726f746174696f6e3d302662726f773d3135383826636865656b5f64657461696c733d2d31266561723d31343333266579653d31363231266579656c6173683d32323831266579655f64657461696c733d3133343726666163655f6c696e65733d3133363626676c61737365733d3133373026686169723d31333337266861743d31333736266a61773d31343232266d6f7574683d32333432266e6f73653d3135333226626c7573685f746f6e653d31363735343839302662726f775f746f6e653d393538313526657965736861646f775f746f6e653d313637343934303826686169725f746f6e653d313536353639313126686169725f74726561746d656e745f746f6e653d37393033333935266c6970737469636b5f746f6e653d3837313633353426707570696c5f746f6e653d313131313934393426736b696e5f746f6e653d313231353930373726626f64793d37266272656173743d3026666163655f70726f706f7274696f6e3d34266579655f73706163696e673d32266579655f73697a653d30266f75746669743d31303137393834"
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          left: 0,
          textAlign: "center",
          backgroundColor: "#ffffff77",
          color: "black",
          fontWeight: "bold",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{alignSelf: "center", marginBottom: -3}}>Hello</div>
      </div>
    </CharacterFrame>
  </CharacterOutline>
);

const CharacterOutline = styled.div`
  vertical-align: top;
  min-width: 10vw;
  max-width: 25vw;
  width: 110px;
  min-height: 10vw;
  max-height: 25vw;
  height: 110px;
  color: white;
  display: inline-flex;
  box-sizing: border-box;
  padding: 2px;
`;

const CharacterFrame = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border-radius: 10px;
`;
