import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import {
  getProductsDetail,
  getProductsDetailComments,
} from '../../services/products-api';
import useAsyncRequest from '../../hooks/useAsyncRequest';
import useComments from '../../hooks/useComments';
import { ProductDetail } from '../../types';

import { Page, Container } from '../../styles/Common.styles';
import { StyledLine, StyledComentContainer } from './ProdDetailPage.styles';

import ComentPost from '../../components/Coment/ComentPost';
import ComentList from '../../components/Coment/ComentList';
import ProdDetail from './ProdDetail';

function ProdDetailPage() {
  const [details, setDetails] = useState<ProductDetail | null>(null);
  const { execute, isLoading, error: fetchError } = useAsyncRequest();
  const {
    commentsList,
    isLoading: commentLoading,
    error: commentFetchError,
    handleEditSubmit,
    handleDeleteClick,
  } = useComments(getProductsDetailComments);

  const { productId } = useParams<{ productId: string }>();

  useEffect(() => {
    const loadProductDetails = async () => {
      if (!productId) return;
      const result = await execute(() => getProductsDetail(productId));
      if (result) setDetails(result);
    };

    loadProductDetails();
  }, [productId, execute]);

  if (!details) return <p>상품 정보를 불러올 수 없습니다.</p>;
  if (isLoading || commentLoading) return <p>로딩 중 입니다...</p>;
  if (fetchError || commentFetchError)
    return <p>데이터를 불러올 수 없습니다.</p>;

  return (
    <Page>
      <Container>
        <ProdDetail
          images={details.images}
          prodName={details.name}
          price={details.price}
          desc={details.description}
          tags={details.tags}
          userName={details.ownerNickname}
          createdAt={details.createdAt}
          favoriteCount={details.favoriteCount}
        />
        <StyledLine />
        <StyledComentContainer>
          <ComentPost
            title='문의하기'
            placeholder='개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다.'
          />
          <ComentList
            commentsList={commentsList}
            onEditSubmit={handleEditSubmit}
            onDeleteClick={handleDeleteClick}
            type='inquiry'
          />
        </StyledComentContainer>
      </Container>
    </Page>
  );
}

export default ProdDetailPage;
