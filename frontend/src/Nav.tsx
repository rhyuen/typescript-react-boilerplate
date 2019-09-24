import * as React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledNav: React.FunctionComponent<{}> = styled.nav`
  grid-column: 1 / span 14;
  background-color: lavender;
  display: flex;
  justify-content: space-between;
  padding: 15px;
  align-items: center;
  height: 5vh;
`;

interface NavProps {
  handleLogout(): any;
}

const Nav: React.FunctionComponent<NavProps> = ({ handleLogout }) => {
  return (
    <StyledNav>
      <section>
        <span>
          <Link to="/">Home</Link>
        </span>
        <span>
          <Link to="/about">About</Link>
        </span>
        <span>
          <Link to="/contact">Contact</Link>
        </span>
      </section>
      <section>
        <span>UserName</span>
        <span onClick={handleLogout}>Logout</span>
      </section>
    </StyledNav>
  );
};

export default Nav;
