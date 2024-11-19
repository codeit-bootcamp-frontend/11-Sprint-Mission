import styled from 'styled-components';
import { media } from '../../../styles/media.styles';

const StyledLogo = styled.h1`
  width: 15.3rem;
  height: 5.1rem;

  ${media.mo`
    width: 8.1rem;
    height: 2.7rem;
  `}
`;

export { StyledLogo };
