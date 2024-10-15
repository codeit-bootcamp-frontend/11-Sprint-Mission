import { Link, NavLink, useLocation } from "react-router-dom";
import Logo from "../BeforeSprintReact/images/logos/panda.png";
import Icon from "../images/icons/account.png";
import "../BeforeSprintReact/style/global.css";
import "./Navbar.css";

function getNavStyle({ isActive, currentPath }) {
  return {
    color: isActive || currentPath === "/additem" ? "#3692FF" : undefined,
  };
}

function Navbar() {
  const location = useLocation();

  return (
    <header>
      <div className="navLeft">
        <Link to="../BeforeSprintReact/index.html">
          <img
            width="150"
            src={Logo}
            alt="판다마켓 헤더 로고"
            className="haderLogo"
          />
        </Link>
        <nav>
          <ul id="navUl">
            <li>
              <NavLink to="/community" style={getNavStyle}>
                자유게시판
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/items"
                style={({ isActive }) =>
                  getNavStyle({ isActive, currentPath: location.pathname })
                }
              >
                중고마켓
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>

      <Link to="../BeforeSprintReact/login.html">
        <img src={Icon} alt="계정아이콘" id="accountButton" />
      </Link>
    </header>
  );
}

export default Navbar;