import { useLocation } from 'react-router-dom';
import '../style/Navbar.css';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="nav-front">
        <a href="./index.html">
          <img
            className="logo-image"
            src={process.env.PUBLIC_URL + '/images/Property 1=md.svg'}
            alt="판다마켓 로고"
          />
        </a>
        <div className="nav-link">
          <a href="#">자유게시판</a>
          <a
            href="/items"
            className={location.pathname === '/items' ? 'active-link' : ''}
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
