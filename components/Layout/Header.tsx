import Image from "next/image";
import Link from "next/link";
import Logo from "@/assets/images/logo/logo.svg";
import Profile from "@/assets/images/ui/ic_profile.svg";
import styles from "@/components/Layout/Header.module.css";

export default function Header() {
  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles["navbar-left"]}>
          <Link href="/" passHref>
            <Image src={Logo} alt="Logo" width={153} height={51} />
          </Link>
          <ul>
            <li>
              <Link href="/boards">자유게시판</Link>
              <Link href="/community">커뮤니티</Link>
            </li>
          </ul>
        </div>
        <Link href="/profile">
          <Image src={Profile} alt="Profile" width={40} height={40} />
        </Link>
      </nav>
    </>
  );
}
