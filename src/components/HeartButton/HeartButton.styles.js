import styled from 'styled-components';
import { ReactComponent as HeartSvg } from '../../assets/ic_heart.svg';
import font from '../../styles/fontStyle.styled';

export const StyledHeartIcon = styled(HeartSvg).withConfig({
  shouldForwardProp: (prop) =>
    !['size', 'borderType', 'isActive'].includes(prop),
})`
  fill: ${({ isActive }) => (isActive ? '#FF68CC' : '#fff')};
  width: ${({ borderType, size }) => {
    if (borderType) return '3.2rem';
    return size === 'sm' ? '1.6rem' : '2.4rem';
  }};
  height: ${({ borderType, size }) => {
    if (borderType) return '3.2rem';
    return size === 'sm' ? '1.6rem' : '2.4rem';
  }};

  > path {
    stroke: ${({ isActive }) => (isActive ? '#FF68CC' : 'var(--gray-500)')};
  }

  @media screen and (max-width: 767px) {
    width: ${({ borderType }) => (borderType ? '2.4rem' : 'auto')};
    height: ${({ borderType }) => (borderType ? '2.4rem' : 'auto')};
  }
`;

export const HeartButton = styled.button.withConfig({
  shouldForwardProp: (prop) => !['size', 'borderType'].includes(prop),
})`
  display: flex;
  align-items: center;
  color: var(--gray-500);
  cursor: pointer;
  width: auto;
  height: ${({ borderType }) => (borderType ? '4rem' : 'auto')};
  border-radius: ${({ borderType }) => (borderType ? '3.5rem' : '0')};
  border: ${({ borderType }) =>
    borderType ? '1px solid var(--gray-200)' : 'none'};
  padding: ${({ borderType }) => (borderType ? '0.4rem 1.2rem' : '0')};
  gap: ${({ borderType, size }) => {
    if (borderType) return '0.4rem';
    return size === 'sm' ? '0.4rem' : '0.8rem';
  }};

  ${({ borderType, size }) => {
    if (borderType) return font('16m');
    return size === 'sm' ? font('14') : font('16');
  }}

  @media screen and (max-width: 767px) {
    height: ${({ borderType }) => (borderType ? '3.2rem' : 'auto')};
  }
`;
