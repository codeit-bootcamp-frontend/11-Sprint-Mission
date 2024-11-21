import logoImg from '../assets/Group 19.svg';
import loginImg from '../assets/Frame.svg';
import styles from '../styles/Header.module.css';
import { NavLink } from 'react-router-dom';
import React from 'react';

function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.headerBody}>
        <div className={styles.headerLeft}>
          <div className={styles.imgContainer}>
            <img className={styles.logoImg} src={logoImg} alt="logoImg" />
          </div>
          <nav className={styles.nav}>
            <NavLink
              to=""
              className={({ isActive }: { isActive: boolean }) =>
                isActive ? styles.active : ''
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
                isActive ? styles.active : ''
              }
              style={({ isActive }: { isActive: boolean }) => ({
                backgroundColor: isActive ? '#3692FF' : '',
              })}
            >
              중고마켓
            </NavLink>
          </nav>
        </div>
        <a href="/">
          <img src={loginImg} alt="loginImgBtn" />
        </a>
      </div>
    </div>
  );
}

export default Header;
