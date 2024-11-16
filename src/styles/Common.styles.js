import { media } from './media.styles';

const { styled } = require('styled-components');

export const Page = styled.main`
  padding: 9.4rem 0;
  background-color: #fcfcfc;
  width: 100%;
  height: auto;
`;

export const Container = styled.div`
  width: 100%;
  max-width: 120rem;
  height: auto;
  margin: 0 auto;
  ${media.ta`
    max-width: 69.6rem;
  `}
  ${media.mo`
  max-width: 34.4rem;
  `}
`;
