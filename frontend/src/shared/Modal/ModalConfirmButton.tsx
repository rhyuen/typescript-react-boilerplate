import * as React from "react";
import styled from 'styled-components';

interface Props {
    onClick: () => void;
    value: string;
    type: string;
}

const ModalConfirmButton: React.FunctionComponent<Props> = styled.input<Props>`
    border: 2px solid black;
    background: black;
    color: white;
    text-transform: uppercase;
    padding: 5px;
    font-size: 16px;
    font-weight: bold;
    transition: all 0.2s linear 0s;   
    cursor: pointer; 

    &:hover{
        background: white;
        color: black;
    }

    &:focus{
        outline: none;
    }
`;



const ExportedModalConfirmButton: React.FunctionComponent<Props> = ({ onClick, value, type }: Props) => {
    return (
        <ModalConfirmButton type={type} onClick={onClick} value={value} />
    )
}

export default ExportedModalConfirmButton;