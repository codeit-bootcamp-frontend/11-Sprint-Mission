import "./InputFile.scss";
import IC_PLUS from "../../assets/ic_plus.svg";

function InputFile() {
  return (
    <>
      <label htmlFor='productFile'>
        <img src={IC_PLUS} alt='플러스 아이콘' className='icon-plus' />
        <div className='input-file'>이미지 등록</div>
      </label>
      <input type='file' name='file' id='productFile' />
    </>
  );
}

export default InputFile;
