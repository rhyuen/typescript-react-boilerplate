import styled from 'styled-components';

const TextInput = styled.input`
    border: none;
    border-bottom: 2px solid rgba(0,0,0, 0.2);      

    padding: 1rem;
    padding-left: 0;
    font-size: 16px;
    font-weight: bold;
    background: white;
    margin-bottom: 20px;
    transition: border-bottom-color 0.1s ease-in 0s;

    &:focus{
        outline: none;
        border-bottom-color: black;
    }
    &::placeholder{
        color: rgba(0,0,0,0.2);
    }
`;

export default TextInput;