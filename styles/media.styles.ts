import { css, Interpolation, DefaultTheme } from 'styled-components';

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
