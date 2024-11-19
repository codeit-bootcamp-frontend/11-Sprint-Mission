import {
  ChangeEvent,
  Dispatch,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { InputAction } from "pages/AddItem";

interface Props {
  images: string[];
  name: string;
  children: ReactNode;
  dispatch: Dispatch<InputAction>;
}

function ImgFileInput({ children, images, name, dispatch }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [showWarn, setShowWarn] = useState(false); // 이미지를 1개 이상 추가하려고 할 때를 위한 state
  const isFilled = images.length > 0;

  /**
   * form의 이미지를 저장하고 화면에 추가한 이미지를 렌더링
   * @param {*} path 인코딩된 파일 스트링
   */
  const setImg = (path?: string) => {
    dispatch({ type: "SET_IMAGES", payload: path ? [path] : [] });
  };

  /**
   * 이미지 파일 추가 - 1개 이상인 경우 클릭 시 경고 노출
   */
  const handleClick = () => {
    if (!isFilled && inputRef.current) inputRef.current.click();
    else setShowWarn(true);
  };

  /**
   * 입력 받은 파일을 인코딩하고 저장 및 렌더링
   * @param {*} e
   */
  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const imgUrl = files[0];
      const imgPath = URL.createObjectURL(imgUrl);
      setImg(imgPath);

      if (inputRef.current) inputRef.current.value = "";
    }
  };

  /**
   * 이미지 삭제
   */
  const handleDelete = () => {
    setImg();
    setShowWarn(false);
  };

  /**
   * 컴포넌트 언마운트 시 객체 URL이 있으면 해제
   */
  useEffect(() => {
    return () => {
      if (images.length > 0) URL.revokeObjectURL(images[0]);
    };
  }, [images]);

  return (
    <div className='form-input-wrap'>
      <label htmlFor={`item_${name}`}>{children}</label>
      <input
        ref={inputRef}
        id={`item_${name}`}
        className='sr-only'
        type='file'
        accept='image/*'
        disabled={isFilled}
        onChange={handleFileInput}
      />
      <div className='upload-area'>
        <button
          className='btn-upload-img'
          type='button'
          title='이미지 등록'
          onClick={handleClick}
        >
          <img src='/images/icons/ic_plus.svg' alt='이미지 등록' />
          이미지 등록
        </button>
        {isFilled && (
          <div className='thumbnail'>
            <img src={images[0]} alt='thumbnail' />
            <button
              type='button'
              className='btn-delete-thumbnail'
              onClick={handleDelete}
            >
              <span className='sr-only'>삭제</span>
            </button>
          </div>
        )}
      </div>
      {showWarn && (
        <div className='error-msg'>*이미지 등록은 최대 1개까지 가능합니다.</div>
      )}
    </div>
  );
}

export default ImgFileInput;
