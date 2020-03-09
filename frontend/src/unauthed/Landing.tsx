import * as React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ClickButton from "../shared/ClickButton"
import BannerRoot from "./BannerComponents/BannerRoot"
import BannerFullSection from "./BannerComponents/BannerFullSection"
import BannerHalfSection from "./BannerComponents/BannerHalfSection"
import Header from "../shared/Header"
import Grid from "../Grid";

interface Props { }

const Banner_Nav = styled.section`
  display: flex;
  grid-column: span 12;
  justify-content: space-between;
`;
const Banner_Footer = styled.section`
  display: flex;
  grid-column: span 12;
  justify-content: center;
`;

const StyledList = styled.ul`
  list-style-type: none
`;

const StyledListItem = styled.li`
  display: inline;
  margin-left: 40px;  
  font-size: 18px;  
  font-weight: bold;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  font-size: 16px;  
  padding-bottom: 10px;
  border-bottom: 2px solid transparent;
  color: black;

  &:visited{
    color: black;
  }
  &:hover{
    border-bottom-color: black;
  }
`;

const Footer = styled.footer`
  grid-column: 1/-1;
  height: 35vh;
  background: black;
`;


const Landing: React.FunctionComponent<Props> = () => {
  return (
    <Grid>
      <BannerRoot>
        <Banner_Nav>
          <StyledList>LAICOS</StyledList>
          <StyledList>
            <StyledListItem><StyledLink to="/forgot">Lost?</StyledLink></StyledListItem>
            <StyledListItem><StyledLink to="/login">Sign In</StyledLink></StyledListItem>
            <StyledListItem><Link to="/signup"><ClickButton>Get Started</ClickButton></Link></StyledListItem>
          </StyledList>
        </Banner_Nav>
        <BannerFullSection>
          <div>
            <Header>LAICOS: Another Social Network for the ages.</Header>
            <StyledList>
              <li>Begin sharing inane thoughts that have no business in the world</li>
              <li>It's <strong>SOCIAL</strong>: <em>backwards</em>.</li>
            </StyledList>
          </div>
        </BannerFullSection>
        <Banner_Footer>
          <StyledList>
            <StyledListItem>Bots</StyledListItem>
            <StyledListItem>Surveillance</StyledListItem>
            <StyledListItem>Frivolity</StyledListItem>
            <StyledListItem>Tailored just for you.</StyledListItem>
          </StyledList>
        </Banner_Footer>
      </BannerRoot>
      <BannerRoot>
        <BannerHalfSection />
        <BannerHalfSection>
          <StyledList>
            <Header>Includes the following features:</Header>
            <li>Share your thoughts</li>
            <li>Make Friends</li>
            <li>Contribute to the Panopticon</li>
          </StyledList>
        </BannerHalfSection>
      </BannerRoot>
      <Footer></Footer>
    </Grid>
  );
};

export default Landing;
