// src/styles/Common/media.js
import { css } from 'styled-components';

export const responsiveGridColumns = {
  desktop: css`
    grid-template-columns: repeat(3, 1fr);
  `,
  tablet: css`
    @media screen and (min-width: 768px) and (max-width: 1248px) {
      grid-template-columns: repeat(2, 1fr);
    }
  `,
  mobile: css`
    @media screen and (max-width: 767px) {
      grid-template-columns: repeat(1, 1fr);
    }
  `,
};

export const media = {
  ta: (...args) => css`
    @media screen and (min-width: 768px) and (max-width: 1248px) {
      ${css(...args)}
    }
  `,
  mo: (...args) => css`
    @media screen and (max-width: 767px) {
      ${css(...args)}
    }
  `,
  tamo: (...args) => css`
    @media screen and (max-width: 1248px) {
      ${css(...args)}
    }
  `,
};
