import { useState } from "react";
import ICON_KEBAB from "../../assets/ic_kebab.svg";

function DropDownMenu({ children }) {
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const handleMenuClick = () => {
    setIsMenuVisible(!isMenuVisible);
  };
  return (
    <div className="dropdown">
      <button className="dropdown-icon" onClick={handleMenuClick}>
        <img src={ICON_KEBAB} alt="더보기" />
      </button>
      {isMenuVisible && <ul className="more-list">{children}</ul>}
    </div>
  );
}

function DropDownItem({ children, onClick, className }) {
  return (
    <li className={`more-item ${className}`}>
      <button onClick={onClick}>{children}</button>
    </li>
  );
}

DropDownMenu.Item = DropDownItem;

export default DropDownMenu;
