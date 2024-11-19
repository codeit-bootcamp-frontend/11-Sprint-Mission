import { ReactNode, useState } from 'react';
import ICON_KEBAB from '/ic_kebab.svg';
import {
  DropDownContainer,
  MoreList,
  ItemButton,
  ToggleButton,
} from './DropDownMenu.styles';

interface DropDownProps {
  children: ReactNode;
}

function DropDownMenu({ children }: DropDownProps) {
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

interface DropDownItemProps extends DropDownProps {
  onClick: () => void;
}
function DropDownItem({ children, onClick }: DropDownItemProps) {
  return (
    <li>
      <ItemButton onClick={onClick}>{children}</ItemButton>
    </li>
  );
}

DropDownMenu.Item = DropDownItem;

export default DropDownMenu;
