import * as React from "react";
import styled, { keyframes } from "styled-components";

const rotate = keyframes`
    0% { 
        transform: rotate(0);      
    }
    100% { 
        transform: rotate(360deg); 
    }
`;

const Spinner = styled.div`
    height: 48px;
    width: 48px;
    border: 5px solid rgba(150, 150, 150, 0.2);
    border-radius: 50%;
    border-top-color: rgb(150, 150, 150);
    animation: ${rotate} 1s 0s infinite ease-in-out normal;    
`;

const Container = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    height: 60vh;
`;
const Caption = styled.p`
    font-weight: bold;
    font-size: 18px;
`;



const ExportedSpinner: React.FunctionComponent<{}> = ({ children }) => {
    const [count, setCount] = React.useState<number>(0);

    React.useEffect(() => {
        setInterval(() => {
            setCount(pc => (pc + 1));
        }, 1000);
    }, [])

    return (
        <Container>
            <Spinner />
            <p>Time spent waiting: {count} seconds.</p>
            <Caption>{children}</Caption>
        </Container>
    );
}

export default ExportedSpinner;