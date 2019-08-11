import * as React from "react";
import styled from "styled-components";

const Grid: React.FunctionComponent<{}> = styled.main`
  display: grid;
  grid-template-columns:
    minmax(20px, 1fr)
    repeat(12, minmax(auto, 100px))
    minmax(20px, 1fr);
`;

export default Grid;
