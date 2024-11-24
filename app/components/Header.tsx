"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import styles from "./Header.module.css";

function Header() {
  const pathname = usePathname();

  const getNavStyle = (path: string) => {
    return {
      color: pathname === path ? "#3692FF" : undefined,
    };
  };

  return (
    <header className={styles.header}>
      <div className={styles.navLeft}>
        <Link href="/">
          <Image
            width={150}
            height={50}
            src="/logos/panda.png"
            alt="판다마켓"
            className={styles.headerLogo}
          />
        </Link>

        <nav>
          <ul className={styles.navUl}>
            <li>
              <Link href="/community" style={getNavStyle("/community")}>
                자유게시판
              </Link>
            </li>
            <li>
              <Link href="/items" style={getNavStyle("/items")}>
                중고마켓
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <Link href="/login">
        <Image
          width={30}
          height={30}
          src="/images/user.png"
          alt="유저"
          className={styles.accountButton}
        />
      </Link>
    </header>
  );
}

export default Header;
