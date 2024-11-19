import styled from 'styled-components';
import { media } from '../../styles/media.styles';
import { HeartIconProps } from './HeartIcon';

const Svg = styled.svg.withConfig({
  shouldForwardProp: (prop) =>
    !['isActive', 'borderType', 'size'].includes(prop),
})<HeartIconProps>`
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

  ${media.tamo`
    width: ${({ borderType }) => borderType && '2.4rem'};
    height: ${({ borderType }) => borderType && '2.4rem'};
  `}
`;

export default Svg;
