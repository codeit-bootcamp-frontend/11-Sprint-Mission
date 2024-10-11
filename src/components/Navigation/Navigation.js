import "./Navigation.css";
import logoIcon from "../../assets/images/logo_icon.svg";
import profile from "../../assets/images/profile.svg";

const tabs = [
  { id: 0, name: "자유게시판", path: "/borad" },
  { id: 1, name: "중고마켓", path: "/items" },
];

function Navigation() {
  return (
    <nav className="Navigation">
      <div className="Navigation-wrap">
        <a href="/" className="logo-wrap">
          <img
            className="logo-icon"
            src={logoIcon}
            alt="판다마켓 아이콘 로고"
          />
          <span className="logo-text">판다마켓</span>
        </a>
        <ul className="Navigation-tabs">
          {tabs.map((tab) => (
            <li key={tab.id}>
              <Tab path={tab.path}>{tab.name}</Tab>
            </li>
          ))}
        </ul>
        <a className="profile" href="/">
          <img src={profile} alt="유저 프로필" />
        </a>
      </div>
    </nav>
  );
}

function Tab({ path, children }) {
  const currnetPath = window.location.pathname;
  const classNames = `tab ${currnetPath === path ? "current" : ""}`;

  return (
    <a className={classNames} href={path}>
      <span>{children}</span>
    </a>
  );
}

export default Navigation;
