import * as React from "react";
import * as ReactDOM from "react-dom";
import styled from "styled-components";


interface Props {
    children: React.ReactNode;
}

const GrayModal = styled.section`
    position: fixed;
    top: 0;
    height: 100vh;
    width: 100vw;
    left: 0;
    background: rgba(0,0,0,0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 5;
`;

const Cardless = styled.div`
    position: relative;
    padding: 10px;
    color: white;
    font-weight: bold;
`;

const LoadingBar = styled.div`
    box-sizing: border-box;
    border: 2px solid white;
    background-color: inherit;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: 40px;
`;
const BarPartition = styled.span`
    padding: 2px;
    margin: 4px;
    grid-column: span 1;
    grid-row: span 1;
    background: white;    
`;



const LoadingModal: React.FunctionComponent<Props> = ({ children }: Props) => {
    const portalRoot = document.getElementById("modal");
    const el = document.createElement("div");

    React.useEffect(() => {
        portalRoot!.appendChild(el);

        return () => {
            portalRoot!.removeChild(el);
        }
    }, []);



    return ReactDOM.createPortal(
        <GrayModal>
            <Cardless>
                <LoadingBar>
                    <BarPartition></BarPartition>
                    <BarPartition></BarPartition>
                    <BarPartition></BarPartition>
                    <BarPartition></BarPartition>
                    <BarPartition></BarPartition>
                </LoadingBar>
                <p>
                    {children}
                </p>
            </Cardless>
        </GrayModal>,
        el
    );
}

export default LoadingModal;
