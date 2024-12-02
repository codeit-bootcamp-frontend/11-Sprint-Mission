import styled from 'styled-components';
import { useRouter } from 'next/router';

const BoardsPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return <Container>{id}번 게시글 페이지</Container>;
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;

  @media (min-width: 768px) {
    padding: 16px 24px;
  }

  @media (min-width: 1200px) {
    max-width: 1200px;
    padding: 24px 0;
    margin: 0 auto;
  }
`;

export default BoardsPage;
