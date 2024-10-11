import { NavLink } from "react-router-dom";

function getLinkStyle({ isActive }) {
  return {
    color: isActive ? "#3692ff" : undefined,
  };
}

const linkList = [
  {
    name: "자유게시판",
    path: "/boards",
  },
  {
    name: "중고마켓",
    path: "/items",
  },
];

const Navigation = () => {
  return (
    <ul className="SubHeader__nav">
      {linkList.map((link) => {
        return (
          <li key={link.path}>
            <NavLink to={link.path} style={getLinkStyle}>
              {link.name}
            </NavLink>
          </li>
        );
      })}
    </ul>
  );
};

export default Navigation;
