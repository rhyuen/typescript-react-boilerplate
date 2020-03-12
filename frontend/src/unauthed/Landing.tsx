import * as React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ClickButton from "../shared/ClickButton"
import BannerRoot from "./BannerComponents/BannerRoot"
import BannerFullSection from "./BannerComponents/BannerFullSection"
import BannerHalfSection from "./BannerComponents/BannerHalfSection"
import Header from "../shared/Header"
import Grid from "../Grid";
import HorizontalList from "./BannerComponents/BannerHorizontalList";
import VerticalList from "./BannerComponents/BannerVerticalList";
import HorizontalListItem from "./BannerComponents/BannerHorizListItem"

interface Props { }

const Banner_Nav = styled.section`
  display: flex;
  grid-column: span 12;  
  justify-content: space-between;
`;
const Banner_Footer = styled.section`
  display: flex;
  grid-column: span 12;
  align-items: center;
  justify-content: center;
`;

const BannerHeader = styled.h1`
  font-weight: bold;
  font-size: 32px;
  text-align: center;
`;



const StyledListItem = styled.li`
  display: inline;
  margin: 20px;  
  font-size: 18px;  
  font-weight: bold;
`;

const VerticalListItem = styled.li`
  padding: 0;
  margin: 20px;
  text-align: center;
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

const BannerFullSectionContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: center;
`;


const Landing: React.FunctionComponent<Props> = () => {
  return (
    <>
      <BannerRoot>
        <Banner_Nav>
          <HorizontalList><strong>LAICOS</strong></HorizontalList>
          <HorizontalList>
            <HorizontalListItem ><StyledLink to="/forgot">Lost?</StyledLink></HorizontalListItem>
            <HorizontalListItem ><StyledLink to="/login">Sign In</StyledLink></HorizontalListItem>
            <HorizontalListItem >
              <StyledLink to="/signup">
                <ClickButton>Get Started</ClickButton>
              </StyledLink>
            </HorizontalListItem>
          </HorizontalList>
        </Banner_Nav>
        <BannerFullSection>
          <BannerFullSectionContent>
            <BannerHeader>LAICOS: Another Social Network for the ages.</BannerHeader>
            <VerticalList>
              <VerticalListItem><strong>Begin sharing inane thoughts that have no business in the world.</strong></VerticalListItem>
              <VerticalListItem>It's <strong>SOCIAL</strong>: <em>backwards</em>.</VerticalListItem>
              <VerticalListItem><StyledListItem><Link to="/signup"><ClickButton>Get Started</ClickButton></Link></StyledListItem></VerticalListItem>
              <VerticalListItem>Already have an account? &nbsp;<StyledLink to="/login">Sign in</StyledLink>.</VerticalListItem>
            </VerticalList>
          </BannerFullSectionContent>
        </BannerFullSection>
        <Banner_Footer>
          <HorizontalList>
            <HorizontalListItem >Bots</HorizontalListItem>
            <HorizontalListItem >Surveillance</HorizontalListItem>
            <HorizontalListItem >Frivolity</HorizontalListItem>
            <HorizontalListItem >Tailored just for you.</HorizontalListItem>
          </HorizontalList>
        </Banner_Footer>
      </BannerRoot>
      <BannerRoot>
        <BannerHalfSection />
        <BannerHalfSection>
          <VerticalList>
            <Header>Includes the following features:</Header>
            <li>Share your thoughts</li>
            <li>Make Friends</li>
            <li>Contribute to the Panopticon</li>
          </VerticalList>
        </BannerHalfSection>
      </BannerRoot>
      <Footer></Footer>
    </>
  );
};

export default Landing;
