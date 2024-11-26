import styled from 'styled-components';

const IC_X = '/ic_X.svg';

interface BtnClose {
  onClick: () => void;
}

function BtnClose({ onClick }: BtnClose) {
  return <ButtonDelete onClick={onClick}>삭제</ButtonDelete>;
}

export default BtnClose;

export const ButtonDelete = styled.button`
  cursor: pointer;
  width: 2.2rem;
  height: 2.4rem;
  top: 1.2rem;
  right: 1.2rem;
  background: url(${IC_X}) no-repeat center/contain;
  font-size: 0;
  z-index: 1;
`;
