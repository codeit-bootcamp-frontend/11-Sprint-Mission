import styled from 'styled-components';
import { media } from '../../styles/media.styles';
import { flexColumn } from '../../styles/layout.styles';

const StyledComentListContainer = styled.div`
  ${flexColumn}
  align-items: center;
  justify-content: center;
  gap: 6.4rem;
  width: 100%;
  ${media.ta`
    gap: 5.6rem;
  `}
  ${media.mo`
    gap: 4rem;
  `}
  .coment {
    &-list {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 2.4rem;
      ${media.mo`
      gap: 1.6rem;
      `}
    }

    &-item {
      display: flex;
      flex-direction: column;
      gap: 1.2rem;
    }
  }
`;

const IconReturn = styled.img`
  width: 2.4rem;
  height: 2.4rem;
`;

export { StyledComentListContainer, IconReturn };
