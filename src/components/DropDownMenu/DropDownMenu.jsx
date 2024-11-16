import { useState } from 'react';
import ICON_KEBAB from '../../assets/ic_kebab.svg';
import {
  DropDownContainer,
  MoreList,
  ItemButton,
  ToggleButton,
} from './DropDownMenu.styles';

function DropDownMenu({ children, classNames = '' }) {
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const handleMenuClick = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  return (
    <DropDownContainer>
      <ToggleButton onClick={handleMenuClick}>
        <img src={ICON_KEBAB} alt='더보기' />
      </ToggleButton>
      {isMenuVisible && <MoreList>{children}</MoreList>}
    </DropDownContainer>
  );
}

function DropDownItem({ children, onClick, className }) {
  return (
    <li>
      <ItemButton onClick={onClick}>{children}</ItemButton>
    </li>
  );
}

DropDownMenu.Item = DropDownItem;

export default DropDownMenu;
