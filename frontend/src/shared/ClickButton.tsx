import styled from 'styled-components';

const ClickButton = styled.button`
    border: 2px solid black;
    background: black;
    color: white;
    text-transform: uppercase;
    padding: 0.75rem 1rem;
    border-radius: 2px;
    font-size: 14px;
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

export default ClickButton;