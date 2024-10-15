import "./Navigation.css";
import logoIcon from "../../assets/images/logo_icon.svg";
import profile from "../../assets/images/profile.svg";
import { Link, NavLink } from "react-router-dom";

const TAB_DATAS = [
  { id: 0, name: "자유게시판", path: "/borad" },
  { id: 1, name: "중고마켓", path: "/items" },
];

function Navigation() {
  return (
    <nav className="Navigation">
      <div className="Navigation-wrap">
        <Link to="/" className="logo-wrap">
          <img
            className="logo-icon"
            src={logoIcon}
            alt="판다마켓 아이콘 로고"
          />
          <span className="logo-text">판다마켓</span>
        </Link>
        <ul className="Navigation-tabs">
          {TAB_DATAS.map((data) => (
            <li key={data.id}>
              <Tab data={data} />
            </li>
          ))}
        </ul>
        <Link className="profile" href="/">
          <img src={profile} alt="유저 프로필" />
        </Link>
      </div>
    </nav>
  );
}

function Tab({ data }) {
  const handleTabActive = ({ isActive }) =>
    isActive ? { color: "#3692ff" } : {};
  return (
    <NavLink to={data.path} className="tab" style={handleTabActive}>
      <span>{data.name}</span>
    </NavLink>
  );
}

export default Navigation;
