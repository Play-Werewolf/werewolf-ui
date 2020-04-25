import styled from "styled-components";

export default styled.span`
background-color: ${props => props.color || "royalblue"};
padding: ${props => props.narrow ? 4 : 8}px;
padding-top: ${props => props.narrow ? 5 : 10}px;
color: white;
cursor: pointer;
display: inline-block;
flex-grow: 0;
margin-bottom: ${props => props.narrow ? 0 : 8}px;
`;
