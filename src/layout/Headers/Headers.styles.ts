import styled from 'styled-components';

import { Container } from '../../styles/Common.styles';
import { media } from '../../styles/media.styles';

const HeaderContainer = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 7rem;
  border-bottom: 1px solid #dfdfdf;
  background-color: #fff;
  z-index: 999;
`;

const StlyedContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 3.2rem;

  ${media.mo`
    gap: 0.8rem;
  `}
`;

export { HeaderContainer, StlyedContainer };
