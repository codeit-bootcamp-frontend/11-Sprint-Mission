import ButtonDelete from './BtnClose.styles';

function BtnClose({ onClick }) {
  return <ButtonDelete onClick={onClick}>삭제</ButtonDelete>;
}

export default BtnClose;
