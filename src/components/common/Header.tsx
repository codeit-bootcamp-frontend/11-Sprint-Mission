import { useLocation, NavLink } from "react-router-dom";

interface Props {
  isLogin?: boolean;
}

function Header({ isLogin = false }: Props) {
  const location = useLocation();
  return (
    <header>
      <h1 className='logo'>
        <NavLink to='/' className='link-home' title='판다마켓 홈 이동'>
          <img
            src='/images/home/logo.png'
            className='logo-img logo-pc'
            alt='판다마켓 로고'
          />
          <img
            src='/images/home/logo_mobile.png'
            className='logo-img logo-mobile'
            alt='판다마켓 로고'
          />
        </NavLink>
      </h1>
      {isLogin ? (
        <div className='login-area'>
          <div className='content-link'>
            <NavLink to='/board' title='자유 게시판 페이지 이동'>
              자유게시판
            </NavLink>
            <NavLink
              to='/items'
              title='중고 마켓 페이지 이동'
              className={
                location.pathname.startsWith("/items") ||
                location.pathname.startsWith("/addItem")
                  ? "active"
                  : ""
              }
            >
              중고마켓
            </NavLink>
          </div>
          <NavLink
            to='/profile'
            className='link-proile'
            title='프로필 페이지 이동'
          >
            <img src='/images/icons/ic_user_login.svg' alt='프로필 이미지' />
          </NavLink>
        </div>
      ) : (
        <NavLink to='/login' className='link-login' title='로그인 페이지 이동'>
          로그인
        </NavLink>
      )}
    </header>
  );
}

export default Header;
