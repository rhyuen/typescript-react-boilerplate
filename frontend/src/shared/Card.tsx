import * as React from "react";
import styled from "styled-components";

interface Props {
  index?: string;
  onClick?: any;
}

const Card: React.FunctionComponent<Props> = styled.article`
    border: 1px solid rgba(0,0,0,0.1);
    border-radius: 2px;
    background: white;
    padding: 20px;
    margin-bottom: 20px;        
`;

export default Card;

export const Header = styled.h1`
    font-size: 20px;
    margin: 0px;    
    padding-bottom: 0;
`;

export const SubTitle = styled.div`
  font-size: 15px;
  text-transform: uppercase;  
  color: grey;
`;

