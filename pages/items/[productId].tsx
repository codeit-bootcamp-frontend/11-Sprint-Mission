import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import {
  getProductsDetail,
  getProductsDetailComments,
} from '@/services/products-api';
import useAsyncRequest from '@/hooks/useAsyncRequest';
import useComments from '@/hooks/useComments';
import { ProductDetailType } from '@/types/types';

import { Page, Container } from '@/styles/Common.styles';
import { media } from '@/styles/media.styles';
import { flexColumn } from '@/styles/layout.styles';

import Line from '@/components/shared/Line';
import ProdDetail from '@/components/pages/items/ProdDetail';
import ComentPost from '@/components/shared/Coment/ComentPost';
import ComentList from '@/components/shared/Coment/ComentList';

function ProdDetailPage() {
  const [details, setDetails] = useState<ProductDetailType | null>(null);
  const { execute, isLoading, error: fetchError } = useAsyncRequest();
  const {
    commentsList,
    isLoading: commentLoading,
    error: commentFetchError,
    handleEditSubmit,
    handleDeleteClick,
  } = useComments(getProductsDetailComments);

  const router = useRouter();

  const { productId } = router.query as { productId?: string };

  useEffect(() => {
    if (!router.isReady || !productId) return;
    const loadProductDetails = async () => {
      const result = await execute(() => getProductsDetail(productId));
      if (result) setDetails(result);
    };

    loadProductDetails();
  }, [router.isReady, productId, execute]);

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

const StyledLine = styled(Line)`
  margin: 4rem 0;
  ${media.ta`
    margin: 3.2rem 0 4rem;
  `}
  ${media.mo`
    margin: 2.4rem 0;
  `}
`;

const StyledComentContainer = styled.div`
  ${flexColumn}
  justify-content: center;
  align-items: center;
  gap: 2.4rem;
`;
