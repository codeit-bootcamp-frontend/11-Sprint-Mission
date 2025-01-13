import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import ProfileIcon from "../Icons/ProfileIcon";
import { useEffect, useState } from "react";

function Header() {
  const router = useRouter();
  const { pathname } = router;
  const [hasToken, setHasToken] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("accessToken")
        : null;
    setHasToken(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userId");
    setHasToken(false);
    router.push("/");
  };

  return (
    <header>
      <h1 className='logo'>
        <Link href='/' className='link-home' title='판다마켓 홈 이동'>
          <div className='logo-img logo-pc'>
            <Image fill src='/home/logo.png' alt='판다마켓 로고' />
          </div>
          <div className='logo-img logo-mobile'>
            <Image fill src='/home/logo_mobile.png' alt='판다마켓 로고' />
          </div>
        </Link>
      </h1>
      {hasToken ? (
        <div className='login-area'>
          <div className='content-link'>
            <Link
              href='/boards'
              title='자유 게시판 페이지 이동'
              className={pathname.startsWith("/boards") ? "active" : ""}
            >
              자유게시판
            </Link>
            <Link
              href='/items'
              title='중고 마켓 페이지 이동'
              className={
                pathname.startsWith("/items") || pathname.startsWith("/addItem")
                  ? "active"
                  : ""
              }
            >
              중고마켓
            </Link>
          </div>
          <button
            className='btn-profile'
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <ProfileIcon />
            {isOpen && (
              <button
                type='button'
                className='btn-logout'
                onClick={handleLogout}
              >
                로그아웃
              </button>
            )}
          </button>
        </div>
      ) : (
        <Link href='/login' className='link-login' title='로그인 페이지 이동'>
          로그인
        </Link>
      )}
    </header>
  );
}

export default Header;
