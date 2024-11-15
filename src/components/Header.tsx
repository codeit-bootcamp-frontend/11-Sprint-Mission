import logoImg from '../assets/Group 19.svg';
import loginImg from '../assets/Frame.svg';
import '../styles/Header.css';
import { NavLink } from 'react-router-dom';
import React from 'react';

function Header() {
  return (
    <header>
      <div className="headerBody">
        <div className="header-left">
          <div className="imgContainer">
            <img className="logoImg" src={logoImg} alt="logoImg" />
          </div>
          <nav>
            <NavLink
              to=""
              className={({ isActive }: { isActive: boolean }) =>
                isActive ? 'active' : ''
              }
              style={({ isActive }: { isActive: boolean }) => ({
                backgroundColor: isActive ? '#3692FF' : '',
              })}
            >
              자유게시판
            </NavLink>
            <NavLink
              to="/items"
              className={({ isActive }: { isActive: boolean }) =>
                isActive ? 'active' : ''
              }
              style={({ isActive }: { isActive: boolean }) => ({
                backgroundColor: isActive ? '#3692FF' : '',
              })}
            >
              중고마켓
            </NavLink>
          </nav>
        </div>
        <a href="#">
          <img src={loginImg} alt="loginImgBtn" />
        </a>
      </div>
    </header>
  );
}

export default Header;
