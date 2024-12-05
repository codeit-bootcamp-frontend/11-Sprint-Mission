import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function MainNav() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [showLogout, setShowLogout] = useState<boolean>(false);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    setIsLoggedIn(!!accessToken);
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    setIsLoggedIn(false);
    setShowLogout(false);
    router.push("/");
  };

  const handleProfileClick = () => {
    setShowLogout((prev) => !prev);
  };

  return (
    <nav className="nav-container">
      <div className="nav-bar">
        <div className="nav-front">
          <Link href="/" className="nav-logo">
            <Image
              src="/svgs/판다 얼굴.svg"
              alt="판다얼굴"
              width={40}
              height={40}
            />
            <Image
              src="/svgs/판다마켓.svg"
              alt="판다마켓 로고"
              width={100}
              height={50}
            />
          </Link>
        </div>

        {isLoggedIn ? (
          <div className="profile-container">
            <button
              className="nav-icon"
              onClick={handleProfileClick}
              style={{ background: "none", border: "none" }}
            >
              <Image
                src="/svgs/Frame 2609463.svg"
                alt="프로필 아이콘"
                width={40}
                height={40}
              />
            </button>
            {showLogout && (
              <button className="logout-button" onClick={logout}>
                로그아웃
              </button>
            )}
          </div>
        ) : (
          <Link href="/login" className="login-button">
            로그인
          </Link>
        )}
      </div>
    </nav>
  );
}
