import styled from 'styled-components';
import LikeCount from '@/components/LikeCount';
import { format } from 'date-fns';
import ProfileImg from '@/public/images/icons/ic_profile.svg';

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

interface ArticleContentSectionProps {
	article: Article;
}

const ArticleContentSection: React.FC<ArticleContentSectionProps> = ({ article }) => {
  const date = format(article.createdAt, 'yyyy. MM. dd');

	return (
		<Container>
			<HeaderSection>
        <Title>{article.title}</Title>

        <InfoSection>
          <ProfileImg width={24} height={24} />
          <Username>{article.writer.nickname}</Username>
          <Timestamp>{date}</Timestamp>
          <VericalLine />
          <LikeCount count={article.likeCount}>{article.likeCount}</LikeCount>
        </InfoSection>
      </HeaderSection>

      <Line />

      <Content>{article.content}</Content>
		</Container>
	);
}

const Container = styled.div`
  margin-bottom: 40px;

  @media (min-width: 768px) {
    margin-bottom: 64px;
  }
`;

const HeaderSection = styled.div`
  position: relative;
`;

const Title = styled.h1`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 16px;
`;

const InfoSection = styled.div`
  display: flex;
  align-items: center;
  margin-top: 16px;
  gap: 8px;
`;

const Username = styled.span`
  font-size: 14px;
  color: var(--gray-400);
`;

const Timestamp = styled.span`
  font-size: 14px;
  color: var(--gray-400);
`;

const VericalLine = styled.div`
border-left: 1px solid var(--gray-200);
height: 24px;
`;

const Line = styled.hr`
  width: 100%;
  border: none;
  height: 1px;
  background-color: var(--gray-200);
  margin: 24px 0;
`;

const Content = styled.p`
  font-size: 16px;
`;

export default ArticleContentSection;