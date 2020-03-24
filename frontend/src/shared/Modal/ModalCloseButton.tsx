import styled from "styled-components"
import * as React from "react";

interface Props {
    onClick: () => void;
}

const XButton = styled.input`
    width: 15px;
    height: 15px;
    background: black;
    position: absolute;
    top: 10px;
    right: 10px;
    color: white;
    font-weight: bold;
    font-size: 16px;
    border: 2px solid black;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2px;

    &:hover{
        background-color: white;
        color: black;
    }
`;

const CloseButton: React.FunctionComponent<Props> = ({ onClick }: Props) => {
    return (
        <XButton type="button" onClick={onClick} value="&#10006;" />
    );
}

export default CloseButton;