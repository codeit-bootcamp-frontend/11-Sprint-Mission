// src/styles/Common/media.ts
import { css, Interpolation, DefaultTheme } from 'styled-components';

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
  ta: (
    strings: TemplateStringsArray,
    ...interpolations: Interpolation<DefaultTheme>[]
  ) => css`
    @media screen and (min-width: 768px) and (max-width: 1248px) {
      ${css(strings, ...interpolations)}
    }
  `,
  mo: (
    strings: TemplateStringsArray,
    ...interpolations: Interpolation<DefaultTheme>[]
  ) => css`
    @media screen and (max-width: 767px) {
      ${css(strings, ...interpolations)}
    }
  `,
  tamo: (
    strings: TemplateStringsArray,
    ...interpolations: Interpolation<DefaultTheme>[]
  ) => css`
    @media screen and (max-width: 1248px) {
      ${css(strings, ...interpolations)}
    }
  `,
};
