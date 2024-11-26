import { media } from './media.styles';

import styled from 'styled-components';

export const Page = styled.main`
  padding: 9.4rem 0;
  background-color: #fcfcfc;
  width: 100%;
  height: auto;
  ${media.mo`
    padding: 8.6rem 0;
  `}
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
