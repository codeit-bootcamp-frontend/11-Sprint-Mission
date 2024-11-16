import styled from 'styled-components';

import { Container } from '../../styles/Common.styles';
import { media } from '../../styles/media.styles';
import font from '../../styles/fontStyle.styles';

const HeaderContainer = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 7rem;
  border-bottom: 1px solid #dfdfdf;
  background-color: #fff;
  z-index: 999;

  .logo {
    width: 15.3rem;
    height: 5.1rem;
  }

  .gnb {
    display: flex;
    flex: 1;

    a {
      padding: 2.1rem 1.5rem;
      ${font('18b')}
      text-align: center;
    }
  }

  ${media.mo`
    .logo{
      width: 8.1rem;
      height: 2.7rem;
    }

    .gnb a{
      padding: 2.1rem 0.4rem;
      ${font('16b')}
    }
  `}
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
