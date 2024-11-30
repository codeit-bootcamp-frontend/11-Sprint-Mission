import styled from 'styled-components';
import BestArticleSection from './BestArticleSection';
//import AllArticleSection from './AllArticleSection';
import { GetStaticProps } from 'next';

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

interface BoardsPageProps {
  initialArticles: Article[];
}

interface ArticleRes {
  totalCount: number;
  list: Article[];
}

const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(`https://panda-market-api.vercel.app/articles?orderBy=recent`);
  const data: ArticleRes = await res.json();

  return {
    props: {
      initialArticles: data.list,
    },
  };
};

export default function BoardsPage({ initialArticles }: BoardsPageProps) {
  return (
    <PageContainer>
      <BestArticleSection />
      
    </PageContainer>
  );
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  gap: 40px;

  @media (min-width: 768px) {
    padding: 16px 24px;
  }

  @media (min-width: 1200px) {
    max-width: 1200px;
    padding: 24px 0;
    margin: 0 auto;
  }
`;
