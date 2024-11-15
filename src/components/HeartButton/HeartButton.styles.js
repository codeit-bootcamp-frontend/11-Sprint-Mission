import styled from 'styled-components';
import { ReactComponent as HeartSvg } from '../../assets/ic_heart.svg';
import font from '../../styles/fontStyle.styled';

export const StyledHeartIcon = styled(HeartSvg).withConfig({
  shouldForwardProp: (prop) => !['size', 'type', 'isActive'].includes(prop),
})`
  fill: ${({ isActive }) => (isActive ? '#FF68CC' : '#fff')};
  width: ${({ border, size }) => {
    if (border) return '3.2rem';
    return size === 'sm' ? '1.6rem' : '2.4rem';
  }};
  height: ${({ border, size }) => {
    if (border) return '3.2rem';
    return size === 'sm' ? '1.6rem' : '2.4rem';
  }};

  > path {
    stroke: ${({ isActive }) => (isActive ? '#FF68CC' : 'var(--gray-500)')};
  }

  @media screen and (max-width: 767px) {
    width: ${({ border }) => (border ? '2.4rem' : 'auto')};
    height: ${({ border }) => (border ? '2.4rem' : 'auto')};
  }
`;

export const HeartButton = styled.button.withConfig({
  shouldForwardProp: (prop) => !['size', 'type'].includes(prop),
})`
  display: flex;
  align-items: center;
  color: var(--gray-500);
  cursor: pointer;
  width: auto;
  height: ${({ border }) => (border ? '4rem' : 'auto')};
  border-radius: ${({ border }) => (border ? '3.5rem' : '0')};
  border: ${({ border }) => (border ? '1px solid var(--gray-200)' : 'none')};
  padding: ${({ border }) => (border ? '0.4rem 1.2rem' : '0')};
  gap: ${({ border, size }) => {
    if (border) return '0.4rem';
    return size === 'sm' ? '0.4rem' : '0.8rem';
  }};

  ${({ border, size }) => {
    if (border) return font('16m');
    return size === 'sm' ? font('14') : font('16');
  }}

  @media screen and (max-width: 767px) {
    height: ${({ border }) => (border ? '3.2rem' : 'auto')};
  }
`;
