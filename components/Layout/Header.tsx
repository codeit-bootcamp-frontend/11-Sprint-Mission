import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '@styles/Header.module.css';
import Image from 'next/image';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthProvider';

const Header = () => {
  const { pathname } = useRouter();
  const { isAuthenticated, logout } = useAuth();
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleLogout = () => {
    logout();
    setIsDropdownVisible(false);
  };

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles['nav-front']}>
          <Link href="/">
            <Image
              src="/svgs/ic_logo.svg"
              alt="판다마켓 로고"
              width={100}
              height={50}
            />
          </Link>
          <div className={styles['nav-link']}>
            <Link className={styles['nav-list']} href="/board">
              자유게시판
            </Link>
            <Link
              href="/items"
              className={
                pathname === '/items' || pathname === '/additem'
                  ? `${styles['active-link']} ${styles['nav-list']}`
                  : styles['nav-list']
              }
            >
              중고마켓
            </Link>
          </div>
        </div>
        {isAuthenticated ? (
          <div className={styles['sortButtonWrapper']}>
            <button
              className={styles['sortDropdownTriggerButton']}
              onClick={toggleDropdown}
            >
              <Image
                src="/svgs/ic_profile.svg"
                width={40}
                height={40}
                alt="프로필 이미지"
              />
            </button>
            {isDropdownVisible && (
              <div className={styles['dropdownMenu']}>
                <div className={styles['dropdownItem']} onClick={handleLogout}>
                  로그아웃
                </div>
              </div>
            )}
          </div>
        ) : (
          <Link className={styles['login']} href="/login">
            로그인
          </Link>
        )}
      </nav>
    </>
  );
};

export default Header;
