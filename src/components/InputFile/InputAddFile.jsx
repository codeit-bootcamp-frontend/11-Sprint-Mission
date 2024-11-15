import { useEffect, useRef, useState } from 'react';
import IC_PLUS from '../../assets/ic_plus.svg';

import {
  FileContainer,
  FileArea,
  FileInput,
  FileInputError,
  PreviewContainer,
  ButtonDelete,
} from './InputFile.styles';

function InputAddFile() {
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const handleFileChange = () => {
    if (preview) {
      setError('*이미지 등록은 최대 1개까지 가능합니다.');
      return;
    }
    setError('');
    const file = fileInputRef.current.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
    }
  };

  const handleClearClick = () => {
    if (preview) {
      URL.revokeObjectURL(preview);
    }
    setPreview(null);
    setError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  return (
    <FileContainer>
      <FileArea>
        <label htmlFor='productFile'>
          <img src={IC_PLUS} alt='플러스 아이콘' />
          <span>이미지 등록</span>
        </label>
        <FileInput
          type='file'
          name='file'
          id='productFile'
          onChange={handleFileChange}
          ref={fileInputRef}
        />
        {preview && (
          <PreviewContainer>
            <img src={preview} alt='이미지 프리뷰' />
            <ButtonDelete onClick={handleClearClick}>삭제</ButtonDelete>
          </PreviewContainer>
        )}
      </FileArea>
      {error && <FileInputError>{error}</FileInputError>}
    </FileContainer>
  );
}

export default InputAddFile;
