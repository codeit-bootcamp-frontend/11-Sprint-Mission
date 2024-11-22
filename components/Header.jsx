import Image from 'next/image';
import logo from '../public/ic_logo.svg';
import login from '../public/ic_login.svg';
import Link from 'next/link';

function Header() {
  return (
    <header className="nav-bar">
      <nav className="nav-content">
        <div className="logo">
          <Image src={logo} alt="로고" />
          <Link href="./index.html" className="title">
            판다마켓
          </Link>
        </div>
        <ul className="tab">
          <li className="tab-list">
            <Link id="board" href="./boards">
              자유게시판
            </Link>
          </li>
          <li className="tab-list">
            <Link id="fleaMarket" href="./items">
              중고마켓
            </Link>
          </li>
        </ul>
      </nav>
      <Image src={login} alt="캐릭터" />
    </header>
  );
}

export default Header;
