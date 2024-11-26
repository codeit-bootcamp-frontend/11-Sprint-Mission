import React from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../public/images/logo.svg";
import Profile from "../../public/images/profile.svg";
import "../../styles/Header.module.css";

const Header = () => {
  return (
    <header className="header">
      <div className="headerSection">
        <Link href="/" className="homeLogo">
          <Image src={Logo} alt="판다마켓 로고" className="logoImg" />
        </Link>

        <nav>
          <div className="listSection">
            <Link href="/community" className="communityLink">
              자유게시판
            </Link>
            <Link href="/items" className="itemLink">
              중고마켓
            </Link>
          </div>
        </nav>
      </div>

      <Link href="/login" className="progileSection">
        <Image src={Profile} alt="프로필" className="profileImg" />
      </Link>
    </header>
  );
};

export default Header;
