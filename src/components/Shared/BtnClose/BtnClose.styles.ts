import styled from 'styled-components';

import IC_X from '../../../assets/ic_X.svg';

const ButtonDelete = styled.button`
  cursor: pointer;
  width: 2.2rem;
  height: 2.4rem;
  top: 1.2rem;
  right: 1.2rem;
  background: url(${IC_X}) no-repeat center/contain;
  font-size: 0;
  z-index: 1;
`;

export default ButtonDelete;
