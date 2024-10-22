import { useState } from "react";
import ICON_KEBAB from "../../assets/ic_kebab.svg";
import styled from "styled-components";

function DropDownMenu({ children, classNames = "" }) {
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const handleMenuClick = () => {
    setIsMenuVisible(!isMenuVisible);
  };
  return (
    <div className={`dropdown ${classNames}`}>
      <ToggleButton className="dropdown-icon" onClick={handleMenuClick}>
        <img src={ICON_KEBAB} alt="더보기" />
      </ToggleButton>
      {isMenuVisible && <MoreList>{children}</MoreList>}
    </div>
  );
}

function DropDownItem({ children, onClick, className }) {
  return (
    <li className={className}>
      <ItemButton onClick={onClick}>{children}</ItemButton>
    </li>
  );
}

DropDownMenu.Item = DropDownItem;

export default DropDownMenu;

const MoreList = styled.ul`
  position: absolute;
  right: 0;
  border: 1px solid var(--gray-300);
  border-radius: 0.8rem;
  background-color: #fff;
  padding: 0.4rem 0;
  z-index: 1;
`;
const ItemButton = styled.button`
  cursor: pointer;
  font-size: 1.6rem;
  line-height: 2.6rem;
  color: var(--gray-500);
  padding: 0.8rem 4.15rem;
  font-weight: 400;
  white-space: nowrap;
`;

const ToggleButton = styled.button`
  cursor: pointer;
  width: 2.4rem;
  height: 2.4rem;
`;
