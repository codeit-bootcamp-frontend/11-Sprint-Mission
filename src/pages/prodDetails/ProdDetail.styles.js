import styled from 'styled-components';

import { media } from '../../styles/media.styles';
import font from '../../styles/fontStyle.styled';

const StyledProdContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 2.4rem;

  .prod {
    &-images {
      width: 48.6rem;
      height: 48.6rem;
      border-radius: 1.6rem;
      overflow: hidden;
      object-fit: cover;

      ${media.tamo`
        width: 34.3rem;
        height: 34.3rem;
      `}
    }
    &-info {
      position: relative;
      display: flex;
      flex-direction: column;
      gap: 2.4rem;
      width: 69rem;
      ${media.ta`
        width: 34rem;
      `}
    }

    &-title {
      display: flex;
      flex-direction: column;
      h2 {
        ${font('24sb')}
        margin-bottom: 1.6rem;
        ${media.tamo`
          margin-bottom: .8rem;
        `}
        ${media.ta`
          ${font('20sb')}
        `}
        ${media.mo`
          ${font('16sb')}
        `}
      }
      p {
        margin-bottom: 1.6rem;
        ${font('40sb')}
        ${media.ta`
          ${font('32sb')}
        `}
        ${media.mo`
          ${font('24sb')}
        `}
      }
    }

    &-text {
      > * {
        color: var(--gray-600);
      }
      h3 {
        margin-bottom: 1.6rem;
        ${font('16sb')}
        ${media.ta`
          ${font('14sb')}
        `}
      }
      p {
        ${font('16')}
      }
    }

    &-userInfo {
      margin-top: auto;
      ${media.ta`
        margin-top: 1.6rem;
      `}
    }
  }
`;

const IconReturn = styled.img`
  width: 2.4rem;
  height: 2.4rem;
`;

export { StyledProdContainer, IconReturn };
