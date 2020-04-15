import styled from "styled-components";

export default styled.span`
background-color: ${props => props.color || "royalblue"};
padding: 8px;
padding-top: 10px;
color: white;
cursor: pointer;
display: inline-block;
flex-grow: 0;
`;
