import styled from 'styled-components';

import { media } from '../../styles/media.styles';
import { flexColumn } from '../../styles/layout.styles';
import font from '../../styles/fontStyle.styles';

const StyledProdContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 2.4rem;
  ${media.mo`
  flex-direction: column;
  `}

  h2, h3 {
    margin-bottom: 1.6rem;
    ${media.tamo`
      margin-bottom: .8rem;
    `}
  }

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
      ${flexColumn}
      justify-content: space-between;
      width: 69rem;
      ${media.tamo`
        width: 34rem;
        gap: 4rem;
      `}

      &-area {
        ${flexColumn}
        gap: 2.4rem;
        ${media.tamo`
          gap: 1.6rem;
        `}
      }
    }

    &-title {
      &-area {
        ${flexColumn}
        gap: 1.6rem;
      }
      &-text {
        position: relative;
        h2 {
          ${font('24sb')}
          ${media.ta`
            ${font('20sb')}
          `}
          ${media.mo`
            ${font('16sb')}
          `}
        }
        p {
          ${font('40sb')}
          ${media.ta`
            ${font('32sb')}
          `}
          ${media.mo`
            ${font('24sb')}
          `}
        }
      }
    }

    &-text {
      &-area {
        ${flexColumn}
        gap: 2.4rem;
      }
      > * {
        color: var(--gray-600);
      }
      h3 {
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
