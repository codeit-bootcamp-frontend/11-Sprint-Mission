import React from 'react';

function HomeHeader() {
  return (
    <header>
      <nav className="nav-bar">
        <a href="/" aria-label="Panda Market Home">
          <img id="logo" src="images/logos/logo.png" alt="판다마켓 로고" />
        </a>
        <a href="/pages/login.html" className="btn main-login">로그인</a>
      </nav>
    </header>
  );
}

export default HomeHeader;