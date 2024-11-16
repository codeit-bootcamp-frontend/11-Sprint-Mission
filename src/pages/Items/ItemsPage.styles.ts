import styled from 'styled-components';
import { Container, Page } from '../../styles/Common.styles';
import font from '../../styles/fontStyle.styles';
import Button from '../../components/Button/Button';
import { media } from '../../styles/media.styles';
import { flexColumn } from '../../styles/layout.styles';

const StyledPageItem = styled(Page)`
  h2 {
    ${font('20b')}
    color: var(--gray-900);
    flex: 1 1;
  }

  .prod-title {
    display: flex;
    align-items: center;
    margin-bottom: 1.6rem;
    gap: 1.2rem;
    &.toolbar {
      margin-bottom: 2.4rem;
    }
  }

  ${media.mo`
    .prod-title{
      flex-wrap: wrap;
      margin-bottom: 1.6rem;
      gap: .8rem 1.3rem;
        
    }
  `}
`;

const StyledContainer = styled(Container)`
  ${flexColumn}
  gap: 4rem;
`;

const StyledItemButton = styled(Button)`
  && {
    @media screen and (max-width: 767px) {
      order: 2;
    }
  }
`;

export { StyledPageItem, StyledContainer, StyledItemButton };
