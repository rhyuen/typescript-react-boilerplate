import * as React from 'react';
import styled from 'styled-components';

interface Props {
    size?: number,
    children?: React.ReactNode
}

const Col = styled.section<Props>`
    grid-column: span ${props => props.size};
    min-height: 95vh;
`;

const GenericCol: React.FunctionComponent<Props> = ({ size = 6, children }: Props) => {
    return (
        <Col size={size}>{children}</Col>
    )
}



export default GenericCol;