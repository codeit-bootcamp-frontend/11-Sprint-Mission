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
          <img
            className={styles.icon}
            src="./images/ic_logo.svg"
            alt="판다마켓 아이콘 로고"
          />
          <span className={styles.text}>판다마켓</span>
        </Link>
        <ul className={styles.tabList}>
          {TAB_DATAS.map((data) => (
            <li key={data.id}>
              <Tab data={data} />
            </li>
          ))}
        </ul>
        <Link className={styles.profile} href="/">
          <img src="/images/profile.svg" alt="유저 프로필" />
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
