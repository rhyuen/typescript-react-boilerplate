import * as React from "react";
import styled from "styled-components";

const BannerRoot: React.FunctionComponent<{}> = styled.section`
  grid-column: 2 / span 12;
  font-size: 20px;
  display: grid;
  grid-template-columns: repeat(12, minmax(auto, 1fr));   
  grid-template-rows: 10vh 70vh 20vh; 
  height: 100vh;
  margin: 2rem 0;
`;

export default BannerRoot
