import { css } from 'styled-components';

export const sizeStyles = {
  md: css`
    width: 28.2rem;
    height: 28.2rem;
    border-radius: 1.6rem;

    @media screen and (max-width: 1199px) {
      width: 34.3rem;
      height: 34.3rem;
      border-radius: 1.946rem;
    }
  `,
  sm: css`
    width: 22rem;
    height: 22rem;
    border-radius: 1.6rem;

    @media screen and (max-width: 767px) {
      width: 16.8rem;
      height: 16.8rem;
      border-radius: 1.2rem;
    }
  `,
};
