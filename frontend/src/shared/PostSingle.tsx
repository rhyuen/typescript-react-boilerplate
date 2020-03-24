import * as React from "react";
import styled from "styled-components";
import Card from "./Card";
import ClickButton from "./ClickButton";
import Spacer from "./Spacer";

const Post = styled.div`
    margin-bottom: 30px;
`;

const HorizRow = styled.div`
    display: flex;
`;

interface Props {
    children: React.ReactNode
}


const SmallClickButton = styled(ClickButton)`
    padding: 5px 0px;
    color: black;
    border-color: transparent;
    background: white;
    &:hover{
        border-bottom-color: black;
    }
`;



const PostSingle: React.FunctionComponent<Props> = ({ children }: Props) => {
    return (
        <Post>
            <Card>{children}</Card>
            <HorizRow>
                <SmallClickButton>Comments</SmallClickButton>
                <Spacer />
                <SmallClickButton>Reply</SmallClickButton>
            </HorizRow>
        </Post>
    )
}


export default PostSingle;