import * as React from "react";
import * as ReactDOM from "react-dom";
import styled from "styled-components";
import Card from "../Card";
import CloseButton from "./ModalCloseButton";
import ModalConfirmButton from "./ModalConfirmButton";

interface Props {
    onClick: () => void;
    header: string;
    confirmation: boolean;
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

const RelativeCard = styled(Card)`
    position: relative;
`;


const Modal: React.FunctionComponent<Props> = ({ onClick, header, children, confirmation }: Props) => {
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
            <RelativeCard>
                <CloseButton onClick={onClick} />
                <h1>{header}</h1>
                <p>{children}</p>
                {
                    confirmation ?
                        <p>
                            <ModalConfirmButton type="button" onClick={onClick} value="I understand."></ModalConfirmButton>
                        </p> : null
                }




            </RelativeCard>
        </GrayModal>,
        el
    );
}

export default Modal;
