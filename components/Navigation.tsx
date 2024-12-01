import Image from "next/image";
import styles from "./Navigation.module.css";
import Link from "next/link";

interface TabData {
  id: number;
  name: string;
  path: string;
}

const TAB_DATAS = [
  { id: 0, name: "자유게시판", path: "/board" },
  { id: 1, name: "중고마켓", path: "/items" },
];

function Navigation() {
  return (
    <nav className={styles.Navigation}>
      <div className={styles.wrap}>
        <Link href="/" className={styles.logo}>
          <div className={styles.logoIcon}>
            <Image fill src="./images/ic_logo.svg" alt="판다마켓 아이콘 로고" />
          </div>

          <span className={styles.text}>판다마켓</span>
        </Link>
        <ul className={styles.tabList}>
          {TAB_DATAS.map((data) => (
            <li key={data.id}>
              <Tab data={data} />
            </li>
          ))}
        </ul>
        <Link className={styles.profile} href="/signin">
          <div className={styles.profileIcon}>
            <Image fill src="/images/profile.svg" alt="유저 프로필" />
          </div>
        </Link>
      </div>
    </nav>
  );
}

function Tab({ data }: { data: TabData }) {
  return (
    <Link href={data.path} className={styles.tab}>
      <span>{data.name}</span>
    </Link>
  );
}

export default Navigation;
