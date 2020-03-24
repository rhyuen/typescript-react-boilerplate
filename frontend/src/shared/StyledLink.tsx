import * as React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledLink = styled(Link)`
  text-decoration: none;
  font-size: 16px;  
  padding-bottom: 10px;
  border-bottom: 2px solid transparent;
  margin: 0 10px;
  color: black;

  &:visited{
    color: black;
  }
  &:hover{
    border-bottom-color: black;
  }
`;

export default StyledLink