import Image from "next/image";
import Link from "next/link";
import Logo from "@/assets/images/logo/logo.svg";
import Profile from "@/assets/images/ui/ic_profile.svg";
import styles from "@/components/Layout/Header.module.css";
import { useRouter } from "next/router";

export default function Header() {
  const router = useRouter();
  const currentPath = router.pathname;

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles["navbar-left"]}>
          <Link href="/" passHref>
            <Image src={Logo} alt="Logo" width={153} height={51} />
          </Link>
          <ul>
            <li>
              <Link
                href="/boards"
                className={currentPath.includes("/boards") ? styles.active : ""}
              >
                자유게시판
              </Link>
              <Link
                href="/community"
                className={
                  currentPath.includes("/community") ? styles.active : ""
                }
              >
                커뮤니티
              </Link>
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
