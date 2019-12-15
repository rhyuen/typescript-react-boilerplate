import styled from 'styled-components';

const StyledInput = styled.input`
    border: 2px solid black;
    padding: 1rem;
    font-size: 16px;
    font-weight: bold;
    background: white;
    margin-bottom: 0.2rem;

    &:focus{
        outline: none;
    }
    &::placeholder{
        color: rgba(0,0,0,0.2);
    }
`;

export default StyledInput;