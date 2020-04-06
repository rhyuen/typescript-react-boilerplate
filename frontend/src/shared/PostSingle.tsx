import * as React from "react";
import styled from "styled-components";
import Card from "./Card";
import ClickButton from "./ClickButton";
import NoBkgdButton from "./NoBkgdButton";
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




const PostSingle: React.FunctionComponent<Props> = ({ children }: Props) => {
    return (
        <Post>
            <Card>{children}</Card>
            <HorizRow>
                <NoBkgdButton>Comments</NoBkgdButton>
                <Spacer />
                <NoBkgdButton>Reply</NoBkgdButton>
            </HorizRow>
        </Post>
    )
}


export default PostSingle;