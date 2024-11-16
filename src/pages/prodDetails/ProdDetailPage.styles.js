import styled from 'styled-components';
import Line from '../../components/Line/Line';
import { media } from '../../styles/media.styles';
import { flexColumn } from '../../styles/layout.styles';

const StyledLine = styled(Line)`
  margin: 4rem 0;
  ${media.ta`
    margin: 3.2rem 0 4rem;
  `}
  ${media.mo`
    margin: 2.4rem 0;
  `}
`;

const StyledComentContainer = styled.div`
  ${flexColumn}
  justify-content: center;
  align-items: center;
  gap: 2.4rem;
`;

export { StyledLine, StyledComentContainer };
