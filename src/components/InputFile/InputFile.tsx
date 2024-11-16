import { useEffect, useRef, useState } from 'react';
import IC_PLUS from '../../assets/ic_plus.svg';

import {
  FileContainer,
  FileArea,
  FileInput,
  FileInputError,
  PreviewContainer,
  PreviewButton,
} from './InputFile.styles';

interface InputFileProps {
  title: string;
}

function InputFile({ title }: InputFileProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = () => {
    if (preview) {
      setError('*이미지 등록은 최대 1개까지 가능합니다.');
      return;
    }
    setError('');
    const file = fileInputRef.current?.files?.[0];
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
      {title && <h3>{title}</h3>}
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
            <PreviewButton onClick={handleClearClick} />
          </PreviewContainer>
        )}
      </FileArea>
      {error && <FileInputError>{error}</FileInputError>}
    </FileContainer>
  );
}

export default InputFile;
