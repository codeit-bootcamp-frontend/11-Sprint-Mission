import StyledNotResult, { StyledImages } from './NotResult.styles';

import IMAGES_PROD from '../../assets/Img_prod_empty.svg';
import IMAGES_INQUIRY from '../../assets/Img_inquiry_empty.svg';
import IMAGES_COMMENTS from '../../assets/Img_reply_empty.svg';

const typeImages = (type) => {
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

function NotResult({ type = 'inquiry' }) {
  return (
    <StyledNotResult>
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
