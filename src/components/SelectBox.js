import "./SelectBox.css";

function SelectBox() {
  return (
    <form>
      <label htmlFor="textOption"></label>
      <select id="textOption" className="select-text">
        <option className="select-option">수정하기</option>
        <option className="select-option"> 삭제하기</option>
      </select>
    </form>
  );
}

export default SelectBox;
