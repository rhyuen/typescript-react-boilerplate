import styled from 'styled-components';

const SubmitInput = styled.input`
    border: 2px solid black;
    background: black;
    color: white;
    text-transform: uppercase;
    padding: 5px 10px;
    font-size: 16px;
    font-weight: bold;
    transition: all 0.2s linear 0s;    

    &:hover{
        background: white;
        color: black;
    }

    &:focus{
        outline: none;
    }

    &:disabled{
        color: white;
        text-decoration: line-through;
        background: rgba(0,0,0,0.4);
        border-color: grey;
    }
`;

export default SubmitInput;