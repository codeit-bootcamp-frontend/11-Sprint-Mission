import styled, { css } from 'styled-components';
import font from '@/styles/fontStyle.styles';
import { flexColumn } from '@/styles/layout.styles';

const IMAGES_PROD = '/Img_prod_empty.svg';
const IMAGES_INQUIRY = '/Img_inquiry_empty.svg';
const IMAGES_COMMENTS = '/Img_reply_empty.svg';

export interface NotResultProps {
  type?: 'search' | 'inquiry' | 'comments';
}

const typeImages = (type: 'search' | 'inquiry' | 'comments') => {
  switch (type) {
    case 'search':
      return IMAGES_PROD;
    case 'inquiry':
      return IMAGES_INQUIRY;
    case 'comments':
      return IMAGES_COMMENTS;
    default:
      return '';
  }
};

function NotResult({ type = 'inquiry' }: NotResultProps) {
  return (
    <StyledNotResult type={type}>
      <StyledImages type={type} src={typeImages(type)} alt='not result' />
      {type === 'search' && <p>검색어와 일치하는 상품이 없어요</p>}
      {type === 'inquiry' && <p>아직 문의가 없어요</p>}
      {type === 'comments' && (
        <p>
          아직 댓글이 없어요, <br />
          지금 댓글을 달아보세요!
        </p>
      )}
    </StyledNotResult>
  );
}

export default NotResult;

const StyledNotResult = styled.div<NotResultProps>`
  ${flexColumn}
  justify-content: center;
  align-items: center;
  gap: ${({ type }) => {
    if (type === 'comments') return '0.8rem';
    else return '1.6rem';
  }};

  p {
    text-align: center;
    color: var(--gray-400);
    ${font('16')}
  }
`;

export const StyledImages = styled.img<NotResultProps>`
  ${({ type }) => {
    if (type === 'inquiry') {
      return css`
        width: 19.6rem;
        height: 19.6rem;
      `;
    } else {
      return css`
        width: 14rem;
        height: 14rem;
      `;
    }
  }}
`;
