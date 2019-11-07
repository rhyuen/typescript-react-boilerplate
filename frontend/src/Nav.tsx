import * as React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import ClickButton from "./shared/ClickButton"

const StyledNav: React.FunctionComponent<{}> = styled.nav`
  grid-column: 1 / span 14;
  background-color: white;
  display: flex;
  justify-content: space-between;
  padding: 1rem 12rem;
  align-items: center;
  height: 5vh;
  border-bottom: 1px solid rgba(0,0,0,0.1);
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  font-size: 16px;
  font-weight: bold;    

  &:visited{
    color: black;
  }
`;
const NavSpacer = styled.span`
  margin-right: 10px;
`;

interface NavProps {
  handleLogout(): any;
}

const Nav: React.FunctionComponent<NavProps> = ({ handleLogout }) => {
  return (
    <StyledNav>
      <section>
        <NavSpacer>
          <StyledLink to="/">Home</StyledLink>
        </NavSpacer>
        <NavSpacer>
          <StyledLink to="/posts">Posts</StyledLink>
        </NavSpacer>
        <NavSpacer>
          <StyledLink to="/friends">Friends</StyledLink>
        </NavSpacer>
      </section>
      <section>
        <NavSpacer><Link to="/self"><ClickButton>UserName</ClickButton></Link></NavSpacer>
        <NavSpacer><ClickButton onClick={handleLogout}>Logout</ClickButton></NavSpacer>
      </section>
    </StyledNav>
  );
};

export default Nav;
