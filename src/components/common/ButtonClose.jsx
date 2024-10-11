import "./ButtonClose.scss";

function ButtonClose({ onClick = null }) {
  return (
    <button onClick={onClick} className="btn-delete">
      삭제
    </button>
  );
}

export default ButtonClose;
