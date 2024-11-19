import ButtonDelete from './BtnClose.styles';

interface BtnClose {
  onClick: () => void;
}

function BtnClose({ onClick }: BtnClose) {
  return <ButtonDelete onClick={onClick}>삭제</ButtonDelete>;
}

export default BtnClose;
