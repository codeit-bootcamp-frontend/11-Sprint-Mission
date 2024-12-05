import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import LikeCount from '@/components/LikeCount';
import Search from '@/components/Search';
import Dropdown from '@/components/Dropdown';

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

type ArticleSortOption = 'recent' | 'like';

const AllArticleCard = ({ article }: { article: Article }) => {
  const date = format(article.createdAt, 'yyyy. MM. dd');

  return (
    <>
      <CardSection href={`/boards/${article.id}`}>
        <DescriptSection>
          <ArticleTitle>{article.title}</ArticleTitle>
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
          <ArticleInfoDiv>
            {article.writer.nickname}
            <Timestamp>{date}</Timestamp>
          </ArticleInfoDiv>
          <LikeCount count={article.likeCount} />
        </InfoSection>
      </CardSection>
      <Line />
    </>
  );
};

const CardSection = styled(Link)``;

const DescriptSection = styled.div`
  display: flex;
  gap: 8px;
  min-height: 72px;
`;

const ArticleTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  flex: 1;

  @media (min-width: 768px) {
    font-size: 20px;
  }
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

const ArticleInfoDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--gray-600);
  font-size: 14px;
`;

const Timestamp = styled.span`
  font-size: 14px;
  color: var(--gray-400);
`;

const Line = styled.hr`
  width: 100%;
  border: none;
  height: 1px;
  background-color: var(--gray-200);
  margin: 24px 0;
`;

interface AllArticleSectionProps {
  initialArticles: Article[];
}

const AllArticleSection: React.FC<AllArticleSectionProps> = ({
  initialArticles = [],
}) => {
  const [orderBy, setOrderBy] = useState<ArticleSortOption>('recent');
  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const router = useRouter();
  const keyword = (router.query.q as string) || '';

	const handleSortSelection = (sortOption: ArticleSortOption) => {
    setOrderBy(sortOption);
  };

	const handleSearch = (searchKeyword: string) => {
    const query = { ...router.query };
    if (searchKeyword.trim()) query.q = searchKeyword;
    else delete query.q; // 키워드가 빈 문자열일 때 URL에서 query string 없애기
    router.replace({
      pathname: router.pathname,
      query,
    });
  };

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        let url = `https://panda-market-api.vercel.app/articles?orderBy=${orderBy}`;
        if (keyword.trim()) url += `&keyword=${encodeURIComponent(keyword)}`;

        const res = await fetch(url);
        const data = await res.json();

        setArticles(data.list);
      } catch (e) {
        console.error('실패', e);
      }
    };

    fetchArticles();
  }, [orderBy, keyword]);

  return (
    <>
      <HeaderSection>
        <Title>게시글</Title>
        <AddArticleLink href="/addBoard">글쓰기</AddArticleLink>
      </HeaderSection>

      <HeaderSection>
        <Search onSearch={handleSearch} />
        <Dropdown
          onSortSelection={handleSortSelection}
          sortOptions={[
            { key: "recent", label: "최신순" },
            { key: "like", label: "인기순" },
          ]}
        />
      </HeaderSection>

      {articles.length ? (
        articles.map((article) => (
          <AllArticleCard key={`article-${article.id}`} article={article} />
        ))
      ) : (
        <p>게시글이 없습니다.</p>
      )}
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

const AddArticleLink = styled(Link)`
  background-color: ${({ theme }) => theme.colors.blue.primary};
  color: ${({ theme }) => theme.colors.white};
  padding: 11.5px 23px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
`;

export default AllArticleSection;
