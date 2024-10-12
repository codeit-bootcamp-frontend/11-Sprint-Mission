import { useEffect, useState } from "react";
import "./FileInput.css";
import ic_upload from "../../assets/images/ic_plus.svg";

const UPLOAD_LIMIT = 3;
const PREVIEWS_DEFAULT = [];

function FileInput({ name, value, onChange, onDelete }) {
  const [previews, setPreviews] = useState(PREVIEWS_DEFAULT);
  const [isLimit, setIsLimit] = useState(false);

  /**
   * 상품 이미지를 추가하기 위한 핸들러.
   * 파일이 업로드될 시 호출된다.
   * @param {Event} e 이벤트 객체
   */
  const handleChange = (e) => {
    if (isLimit) {
      alert("상품 이미지는 최대 3개까지 업로드 할 수 있습니다.");
      return;
    }
    const image = e.target.files[0];
    onChange(name, { id: Date.now().toString(), image: image });
  };

  const handleDelete = (e) => {
    const id = e.currentTarget.dataset.id;
    onDelete(name, { key: "id", value: id });
  };

  /**
   * 미이보기 이미지의 주소를 저장한 배열을 초기화 한다.
   */
  const handlePreviewsClear = () => {
    setPreviews((prev) => {
      prev.forEach((img) => {
        URL.revokeObjectURL(img.src);
      });
      return PREVIEWS_DEFAULT;
    });
  };

  useEffect(() => {
    if (!Array.isArray(value)) return;
    if (value.length >= UPLOAD_LIMIT) setIsLimit(true);
    else setIsLimit(false);
    const nextPreviews = [];
    value.forEach((el) => {
      nextPreviews.push({ id: el.id, src: URL.createObjectURL(el.image) });
    });
    setPreviews(nextPreviews);
    return () => handlePreviewsClear;
  }, [value]);

  return (
    <fieldset>
      <label id="label-input-images">상품 이미지</label>
      <input
        name={name}
        type="file"
        id="input-images"
        onChange={handleChange}
      />
      <div className="wrap-images">
        <label htmlFor="input-images">
          <img src={ic_upload} alt="이미지 업로드" />
          <div>이미지 등록</div>
        </label>
        {previews.map((img) => {
          return (
            <div
              key={img.id}
              className="img-preview"
              data-id={img.id}
              onClick={handleDelete}
            >
              <img src={img.src} alt="미리보기 이미지" />
              <div className="overlay">
                <img src={ic_upload} alt="이미지 제거" />
                <div>삭제하기</div>
              </div>
            </div>
          );
        })}
      </div>
    </fieldset>
  );
}

export default FileInput;
