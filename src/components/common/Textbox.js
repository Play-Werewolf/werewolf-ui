import styled from "styled-components";

export default styled.input.attrs((props) => ({
    type: props.type || "text"
}))`
line-height: 2em;
font-size: 18px;
vertical-align: middle;
font-weight: 700;
font-family: Normal;
border: 3px solid #ccc;
padding-left: 5px;
padding-right: 5px;
margin-bottom: 8px;
outline: none;
`;
