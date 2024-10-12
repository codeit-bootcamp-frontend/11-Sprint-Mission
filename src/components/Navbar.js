import { useLocation } from 'react-router-dom';
import '../style/Navbar.css';
import { ReactComponent as Logo } from '../images/ic_logo.svg';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="nav-front">
        <a href="./index.html">
          <Logo />
        </a>
        <div className="nav-link">
          <a href="#">자유게시판</a>
          <a
            href="/items"
            className={
              location.pathname === '/items' || location.pathname === '/additem'
                ? 'active-link'
                : ''
            }
          >
            중고마켓
          </a>
        </div>
      </div>
      <a className="login" href="signin.html">
        로그인
      </a>
    </nav>
  );
};

export default Navbar;
