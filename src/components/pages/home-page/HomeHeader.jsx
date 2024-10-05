import React from 'react';
import { Link } from 'react-router-dom';

function HomeHeader() {
  return (
    <header>
      <nav className="nav-bar">
        <a href="/" aria-label="Panda Market Home">
          <img id="logo" src="images/logos/logo.png" alt="판다마켓 로고" />
        </a>
        <Link to='/login' className="btn main-login">로그인</Link>
      </nav>
    </header>
  );
}

export default HomeHeader;