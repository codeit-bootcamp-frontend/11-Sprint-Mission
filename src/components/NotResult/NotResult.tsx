import StyledNotResult, { StyledImages } from './NotResult.styles';

import IMAGES_PROD from '/Img_prod_empty.svg';
import IMAGES_INQUIRY from '/Img_inquiry_empty.svg';
import IMAGES_COMMENTS from '/Img_reply_empty.svg';

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
