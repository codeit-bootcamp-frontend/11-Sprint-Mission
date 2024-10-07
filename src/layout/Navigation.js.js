import { NavLink } from "react-router-dom";

const getNavLinkStyle = ({ isActive }) => ({
  color: isActive ? "var(--blue-100)" : "var(--gray-600)",
});

const navLinks = [
  { name: "자유게시판", path: "/boards" },
  { name: "중고마켓", path: "/items" },
];

const Navigation = () => {
  return (
    <ul className='gnb'>
      {navLinks.map((link) => (
        <li key={link.name}>
          <NavLink to={link.path} style={getNavLinkStyle}>
            {link.name}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default Navigation;
