import "./OptionForm.css";

function OptionForm() {
  return (
    <form>
      <label htmlFor="textOption"></label>
      <select id="textOption">
        <option>
          <p>수정하기</p>
        </option>
        <option>
          <p>삭제하기</p>
        </option>
      </select>
    </form>
  );
}

export default OptionForm;
