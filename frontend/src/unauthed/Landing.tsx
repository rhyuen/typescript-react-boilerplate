import * as React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Grid from "../Grid";

interface Props { }

const Banner: React.FunctionComponent<{}> = styled.div`
  grid-column: 2 / span 12;
  font-size: 20px;
  display: grid;
  grid-template-columns: repeat(12, minmax(auto, 1fr));
`;

const Banner_Section = styled.section`
  grid-column: span 6;
  background: lavender;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Landing: React.FunctionComponent<Props> = () => {
  return (
    <Grid>
      <Banner>
        <Banner_Section>
          <ul>
            Things that suggest I am super awesome.
            <li>First thing is I am awesome</li>
            <li>Dark knight Batman is the best</li>
            <li>Superman is super-duper</li>
          </ul>
        </Banner_Section>
        <Banner_Section>
          <p>
            Click here to signup <Link to="/signup">Signup</Link>
          </p>
          <p>
            Click <Link to="/login">here</Link> to login.
          </p>
          <p>
            So you <Link to="/forgot">forgot</Link> your password again.
          </p>
        </Banner_Section>
      </Banner>
    </Grid>
  );
};

export default Landing;
