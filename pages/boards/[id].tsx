import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getArticleDetail } from '@/api/articleApi';
import ArticleContentSection from './ArticleContentSection';

interface Article {
  updatedAt: Date;
  createdAt: Date;
  likeCount: number;
  writer: { nickname: string; id: number };
  image: string;
  content: string;
  title: string;
  id: number;
}

const BoardsPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [article, setArticle] = useState<Article | null>(null);
  const [error, setError] = useState<string | null>(null);

  const articleId = Number(id);

  useEffect(() => {
    if (!router.isReady) return;

    async function fetchArticle() {
      if(!articleId) {
        setError('아이디없음');
        return;
      }

      try {
        const data: Article = await getArticleDetail(articleId);

        if(!data) throw new Error('데이터를 못찾음');
        
        setArticle(data);
      } catch(e) {
        setError('e.message')
      }
    }

    fetchArticle();
  }, [articleId, router.isReady]);

  if(error) console.log(`${error}`);

  if(!id || !article) return null;

  return (
    <Container>
      <ArticleContentSection article={article} />
    </Container>
  );
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
