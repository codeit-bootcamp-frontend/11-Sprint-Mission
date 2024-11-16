import styled from 'styled-components';
import font from '../../styles/fontStyle.styles';
import { media } from '../../styles/media.styles';

const StyledGnb = styled.ul`
  display: flex;
  flex: 1;

  a {
    padding: 2.1rem 1.5rem;
    ${font('18b')}
    text-align: center;
  }

  ${media.mo`

    a{
      padding: 2.1rem 0.4rem;
      ${font('16b')}
    }
  `}
`;

export { StyledGnb };
