import { useEffect, useState } from "react";
import "./FileInput.css";
import ic_upload from "../../assets/images/ic_plus.svg";

interface Image {
  id: string;
  image: File;
}

interface ImagePriview {
  id: string;
  src: string;
}

const UPLOAD_LIMIT = 3;
const PREVIEWS_DEFAULT: ImagePriview[] = [];

function FileInput({
  name,
  value,
  onChange,
  onDelete,
}: {
  name: string;
  value: Image[];
  onChange: Function;
  onDelete: Function;
}) {
  const [previews, setPreviews] = useState<ImagePriview[]>(PREVIEWS_DEFAULT);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!(event.target instanceof HTMLElement)) return;
    if (value.length < UPLOAD_LIMIT) {
      alert("상품 이미지는 최대 3개까지 업로드 할 수 있습니다.");
      return;
    }
    const image = event.target.files?.[0];
    image && onChange(name, { id: Date.now().toString(), image: image });
  };

  const handleDelete = (event: React.MouseEvent<HTMLDivElement>) => {
    const id = event.currentTarget.dataset.id;
    onDelete(name, id, "id");
  };

  /**
   * 미이보기 이미지의 주소를 저장한 배열을 초기화 한다.
   */
  const handlePreviewsClear = (): void => {
    setPreviews((prev) => {
      prev.forEach((img) => {
        URL.revokeObjectURL(img.src);
      });
      return PREVIEWS_DEFAULT;
    });
  };

  useEffect((): (() => void) | void => {
    if (!Array.isArray(value)) return;
    const nextPreviews: ImagePriview[] = [];
    value.forEach((el) => {
      nextPreviews.push({ id: el.id, src: URL.createObjectURL(el.image) });
    });
    setPreviews(nextPreviews);
    return () => handlePreviewsClear();
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
