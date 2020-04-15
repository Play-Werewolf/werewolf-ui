import React, { Component } from "react";
import styled, { css } from "styled-components";
import WWButton from "../common/WWButton";
import WWTextbox from "../common/WWTextbox";

function LoginAnonymousView(props) {
  return (
    <Container {...props}>
      <EndWrapperFiller></EndWrapperFiller>
      <WWButton1Column>
        <WWButton
          style={{
            height: 36,
            backgroundColor: "rgba(172,102,53,1)",
            marginBottom: -103,
            marginLeft: 84
          }}
          text1="PLAY ANONTMOUSLY"
        ></WWButton>
        <WWTextbox
          style={{
            width: 338,
            height: 43,
            marginBottom: 60
          }}
          text1="Nickname"
          textInput1=""
        ></WWTextbox>
      </WWButton1Column>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const EndWrapperFiller = styled.div`
  flex: 1 1 0%;
  flex-direction: column;
  display: flex;
`;

const WWButton1Column = styled.div`
  width: 338px;
  flex-direction: column;
  display: flex;
`;

export default LoginAnonymousView;
