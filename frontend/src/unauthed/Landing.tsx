import * as React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ClickButton from "../shared/ClickButton"
import Header from "../shared/Header"
import Grid from "../Grid";

interface Props { }

const Banner: React.FunctionComponent<{}> = styled.div`
  grid-column: 2 / span 12;
  font-size: 20px;
  display: grid;
  grid-template-columns: repeat(12, minmax(auto, 1fr));    
  margin: 2rem 0;
`;

const Banner_Section = styled.section`
  grid-column: span 6;
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
`;

const StyledList = styled.ul`
  list-style-type: none
`;


const Landing: React.FunctionComponent<Props> = () => {
  return (
    <Grid>
      <Banner>
        <Banner_Section>
          <StyledList>
            <Header>Another Social Network for the ages.</Header>
            <li>Minimal Security</li>
            <li>No Verification</li>
            <li>Absence of Safeguards</li>
          </StyledList>
        </Banner_Section>
        <Banner_Section>
          <p>
            Signup <Link to="/signup"><ClickButton>here</ClickButton></Link>.
          </p>
          <p>
            Login <Link to="/login"><ClickButton>here</ClickButton></Link>.
          </p>
          <p>
            Password Reset <Link to="/forgot"><ClickButton>here</ClickButton></Link>.
          </p>
        </Banner_Section>
      </Banner>
    </Grid>
  );
};

export default Landing;
