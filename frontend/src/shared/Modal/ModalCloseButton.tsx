import styled from "styled-components"
import * as React from "react";

interface Props {
    onClick: () => void;
}

const XButton = styled.input`
    box-sizing: border-box;
    position: absolute;
    top: 10px;
    right: 10px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    margin: 0;
    background: black;    
    color: white;
    font-weight: bold;
    font-size: 14px;
    border: 2px solid black;
    display: flex;
    justify-content: center;
    align-items: center;    

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