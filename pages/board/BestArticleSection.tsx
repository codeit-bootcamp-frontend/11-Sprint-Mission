import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import debounce from 'lodash/debounce';
import { format } from 'date-fns';
import MedalIcon from '@/public/images/icons/ic_medal.svg';
import LikeCount from '@/components/LikeCount';

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

interface ArticleRes {
  totalCount: number;
  list: Article[];
}

const BestArticleCard = ({ article }: { article: Article }) => {
  const date = format(article.createdAt, 'yyyy. MM. dd');

  return (
    <CardSection href={`/boards/${article.id}`}>
      <BestSection>
        <MedalIcon alt="베스트" />
        Best
      </BestSection>

      <ContentSection>
        <DescriptSection>
          <Title>{article.title}</Title>
          {article.image && (
            <ImgSection>
              <Image
                fill
                src={article.image}
                alt={`${article.id}번 게시글 이미지`}
                style={{ objectFit: 'contain' }}
              />
            </ImgSection>
          )}
        </DescriptSection>

        <InfoSection>
          <Username>{article.writer.nickname}</Username>
          <LikeCount count={article.likeCount}>{article.likeCount}</LikeCount>
          <Timestamp>{date}</Timestamp>
        </InfoSection>
      </ContentSection>
    </CardSection>
  );
};

const CardSection = styled(Link)`
  background-color: var(--gray-50);
  border-redius: 8px;
`;

const BestSection = styled.div`
  display: flex;
  align-items: center;
  background-color: var(--blue);
  border-radius: 0 0 32px 32px;
  font-size: 16px;
  font-weight: 600;
  color:  ${({ theme }) => theme.colors.white};
  gap: 4px;
  padding: 6px 24px 8px 24px;
  margin-left: 24px;
  display: inline-flex;
`;

const ContentSection = styled.div`
  padding: 16px 24px;
`;

const DescriptSection = styled.div`
  display: flex;
  gap: 8px;
  min-height: 72px;
`;

const ImgSection = styled.div`
  background-color:  ${({ theme }) => theme.colors.white};
  border: 1px solid var(--gray-200);
  width: 72px;
  height: 72px;
  border-radius: 8px;
  padding: 12px;
  position: relative;
`;

const InfoSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 16px;
`;

const Username = styled.span`
  font-size: 14px;
  color: var(--gray-400);
`;

const Timestamp = styled.span`
  font-size: 14px;
  color: var(--gray-400);
`;

const useViewport = () => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const handleWindowResize = debounce(() => setWidth(window.innerWidth), 300);

    handleWindowResize();
    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
      handleWindowResize.cancel();
    };
  }, []);

  return width;
};

const getPageSize = (width: number): number => {
  if (width < 768) return 1;
  else if (width < 1200) return 2;
  else return 3;
};

const BestArticlesSection = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [pageSize, setPageSize] = useState<number | null>(null);
  const viewportWidth = useViewport();

  useEffect(() => {
    // 계산이나 데이터 호출 예외처리
    if (viewportWidth === 0) return;

    const newPageSize = getPageSize(viewportWidth);

    if (newPageSize !== pageSize) {
      setPageSize(newPageSize);

      const fetchBest = async (size: number) => {
        try {
          const res = await fetch(
            `https://panda-market-api.vercel.app/articles?orderBy=like&pageSize=${size}`,
          );
          const data: ArticleRes = await res.json();
          setArticles(data.list);
        } catch (e) {
          console.error('실패', e);
        }
      };

      fetchBest(newPageSize);
    }
  }, [viewportWidth, pageSize]);

  return (
    <>
      <HeaderSection>
        <Title>베스트 게시글</Title>
      </HeaderSection>

      <BestArticlesCardSection>
        {articles.map((article) => (
          <BestArticleCard key={article.id} article={article} />
        ))}
      </BestArticlesCardSection>
    </>
  );
};

const HeaderSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;

  @media (min-width: 768px) {
    margin-bottom: 24px;
  }
`;

const Title = styled.h1`
  font-size: 20px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.gray[800]};

  @media (min-width: 768px) {
    font-size: 28px;
  }
`;

const BestArticlesCardSection = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }

  @media (min-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
  }
`;

export default BestArticlesSection;
