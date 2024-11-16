import styled from 'styled-components';

const DropDownContainer = styled.div`
  position: absolute;
  right: 0;
  top: 0;
`;

const MoreList = styled.ul`
  position: absolute;
  right: 0;
  bottom: -10rem;
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

export { DropDownContainer, MoreList, ItemButton, ToggleButton };
