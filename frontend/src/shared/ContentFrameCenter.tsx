import * as React from "react";
import styled from "styled-components";

const ContentFrameCenter = styled.section`
  display: grid;
  grid-column: 2/span 12;
  grid-template-columns: repeat(12, minmax(auto, 100px));
`;

export default ContentFrameCenter;