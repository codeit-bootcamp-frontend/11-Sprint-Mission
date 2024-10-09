import { Link } from "react-router-dom";

function ItemsHeader() {
  return (
    <header>
      <nav className="nav-bar">
        <div className="menu-wrapper">
          <a href="/" aria-label="Panda Market Home">
            <img id="logo" src="images/logos/logo.png" alt="판다마켓 로고" />
          </a>
          <div className="menu">
            <Link className="menu-item">자유게시판</Link>
            <Link className="menu-item">중고마켓</Link>
          </div>
        </div>
        <Link to="/mypage">
          <img id="mypage" src="images/icons/ic_mypage.svg" alt="마이페이지 아이콘" />
        </Link>
      </nav>
    </header>
  );
}

export default ItemsHeader;
