import styled from 'styled-components';

const SubmitInput = styled.input`
    border: 2px solid black;
    background: black;
    color: white;
    text-transform: uppercase;
    padding: 1rem;
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
`;

export default SubmitInput;