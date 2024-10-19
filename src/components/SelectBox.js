import "./SelectBox.css";

function SelectBox() {
  return (
    <form>
      <label htmlFor="textOption"></label>
      <select id="textOption">
        <option>수정하기</option>
        <option>삭제하기</option>
      </select>
    </form>
  );
}

export default SelectBox;
