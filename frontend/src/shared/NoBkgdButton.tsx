import * as React from "react";
import styled from "styled-components";
import ClickButton from "./ClickButton";

const NoBkgdButton = styled(ClickButton)`
    padding: 5px 0px;
    color: black;
    border-color: transparent;
    background: white;
    &:hover{
        border-bottom-color: black;
    }
`;

export default NoBkgdButton;