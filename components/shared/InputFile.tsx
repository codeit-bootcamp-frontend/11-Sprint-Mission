import { useEffect, useRef, useState } from 'react';
import { styled } from 'styled-components';

import font from '@/styles/fontStyle.styles';
import { flexColumn } from '@/styles/layout.styles';

import { ButtonDelete } from './BtnClose';

const IC_PLUS = '/ic_plus.svg';

interface InputFileProps {
  title?: string;
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

export const FileContainer = styled.div`
  ${flexColumn}
  gap: 1.6rem;
  h3 {
    ${font('18b')}
  }
`;

export const FileArea = styled.div`
  display: flex;
  gap: 2.4rem;

  label[for='productFile'] {
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 28.2rem;
    height: 28.2rem;
    border-radius: 1.2rem;
    background-color: var(--gray-100);
    color: var(--gray-400);
    ${font('16')}

    img {
      width: 4.8rem;
      height: 4.8rem;
      margin-bottom: 1.2rem;
    }
  }

  @media screen and (max-width: 1199px) {
    gap: 1rem;

    label[for='productFile'] {
      width: 16.8rem;
      height: 16.8rem;
    }
  }
`;

export const FileInput = styled.input`
  display: none;
`;

export const FileInputError = styled.p`
  ${font('16')}
  color: var(--red);
`;

export const PreviewContainer = styled.div`
  position: relative;
  width: 28.2rem;
  height: 28.2rem;
  border-radius: 1.2rem;
  overflow: hidden;

  @media screen and (max-width: 1199px) {
    width: 16.8rem;
    height: 16.8rem;
  }
`;

export const PreviewButton = styled(ButtonDelete)`
  position: absolute;
`;
