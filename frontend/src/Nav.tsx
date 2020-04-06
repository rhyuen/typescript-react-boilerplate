import * as React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import ClickButton from "./shared/ClickButton"
import NoBkgdButton from "./shared/NoBkgdButton";
import Spacer from "./shared/Spacer";
import Modal from "./shared/Modal/Modal";

const StyledNav: React.FunctionComponent<{}> = styled.nav`
  grid-column: 2 / span 12;  
  background-color: white;  
  display: flex;      
  justify-content: space-between;
  align-items: center;  
  height: 10vh;  
`;
const StyledNavSection = styled.section`  

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
  margin-right: 20px;
`;

interface NavProps {
  handleLogout: () => void;
}

const Nav: React.FunctionComponent<NavProps> = ({ handleLogout }) => {
  const username = document.cookie.split(";").filter(c => {
    return c.split("=")[0] === 'username';
  });

  const currUsername = username.length > 0 ? username[0].split("=")[1] : "";

  const [isModalVisible, setModalVisible] = React.useState<boolean>(false);

  const handleModalChange = () => {
    setModalVisible(!isModalVisible);
  }

  const handleCloseModal = () => {
    setModalVisible(!isModalVisible);
  }

  return (
    <StyledNav>
      {
        isModalVisible ?
          <Modal onClick={handleCloseModal}
            header="Log out?"
            confirmation={false}>
            <p>Are you sure you want to leave?</p>
            <p>
              <NoBkgdButton onClick={handleCloseModal}>Cancel</NoBkgdButton>
              <Spacer />
              <ClickButton onClick={handleLogout}>Logout</ClickButton>
            </p>
          </Modal> : null
      }
      <StyledNavSection>
        <NavSpacer>
          <StyledLink to="/">LACIOS</StyledLink>
        </NavSpacer>
        <NavSpacer>
          <StyledLink to="/posts">Posts</StyledLink>
        </NavSpacer>
        <NavSpacer>
          <StyledLink to="/friends">Friends</StyledLink>
        </NavSpacer>
      </StyledNavSection>
      <StyledNavSection>
        <NavSpacer><Link to="/self"><ClickButton>{currUsername || "YOU"}</ClickButton></Link></NavSpacer>
        <NavSpacer><NoBkgdButton onClick={handleModalChange}>Logout</NoBkgdButton></NavSpacer>
      </StyledNavSection>
    </StyledNav>
  );
};

export default Nav;
