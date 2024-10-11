import { NavLink, useLocation } from "react-router-dom";

function Navigation() {
  // 현재 주소 가져오기
  const location = useLocation();

  const getNavLinkStyle = (to) => {
    const isActive =
      to === location.pathname ||
      (to === "/items" && location.pathname === "/addItem");

    return {
      color: isActive ? "var(--blue-100)" : "var(--gray-600)",
    };
  };

  const navLinks = [
    { name: "자유게시판", path: "/boards" },
    { name: "중고마켓", path: "/items" },
  ];

  return (
    <ul className="gnb">
      {navLinks.map((link) => (
        <li key={link.name}>
          <NavLink to={link.path} style={() => getNavLinkStyle(link.path)}>
            {link.name}
          </NavLink>
        </li>
      ))}
    </ul>
  );
}

export default Navigation;
