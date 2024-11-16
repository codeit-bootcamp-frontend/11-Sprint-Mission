import styled from 'styled-components';
import { media } from '../../styles/media.styles';

const ProdList = styled.div`
  display: flex;
  gap: 2.4rem;
  flex-wrap: wrap;

  ${media.ta`
    gap : ${({ size }) => (size ? '1.6rem' : '1rem')};
  `}

  ${media.mo`
    gap : 0.8rem;
  `}
`;

export default ProdList;
