import Logo from "../assets/images/logo/logo.svg";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";

const GlobalHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: #ffffff;
`;

const LeftHeader = styled.div`
  display: flex;
  align-items: center;
`;

const HeaderLogo = styled(Link)`
  margin-right: 16px;
  width: 153px;

  @media (min-width: 768px) {
    margin-right: 35px;
  }

  @media (min-width: 1280px) {
    margin-right: 47px;
  }
`;

const Navigation = styled.nav``;

const NavList = styled.ul`
  display: flex;
  list-style: none;
  gap: 8px;
  font-size: 16px;
  color: #4b5563;
  white-space: nowrap;

  @media (min-width: 768px) {
    gap: 36px;
    font-size: 18px;
  }
`;

const NavItem = styled.li``;

const NavLinkStyled = styled(NavLink)`
  text-decoration: none;
  color: inherit;

  &:hover {
    color: var(--blue);
  }
`;

const LoginLink = styled(Link)`
  font-size: 16px;
  font-weight: 600;
  border-radius: 8px;
  padding: 11.5px 23px;
  white-space: nowrap;
  text-decoration: none;
  color: inherit;
`;

const Header: React.FC = () => {
  return (
    <GlobalHeader>
      <LeftHeader>
        <HeaderLogo to="/" aria-label="홈이동">
          <img src={Logo} alt="로고" />
        </HeaderLogo>

        <Navigation>
          <NavList>
            <NavItem>
              <NavLinkStyled to="/community">자유게시판</NavLinkStyled>
            </NavItem>
            <NavItem>
              <NavLinkStyled to="/items">중고마켓</NavLinkStyled>
            </NavItem>
          </NavList>
        </Navigation>
      </LeftHeader>

      <LoginLink to="/login" className="loginLink btn">
        로그인
      </LoginLink>
    </GlobalHeader>
  );
}

export default Header;
