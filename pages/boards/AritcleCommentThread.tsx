import { getArticleComment } from '@/api/articleApi';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import ProfileImg from '@/public/images/icons/ic_profile.svg';
import { TimestampCal } from '@/components/TimestampCal'
import BackIcon from '@/public/images/icons/ic_back.svg';
import Link from 'next/link';

interface Comment {
  writer: {
    image: string;
    nickname: string;
    id: number;
  };
  updatedAt: Date;
  createdAt: Date;
  content: string;
  id: number;
}

interface CommentData {
  nextCursor: number;
  list: Comment[];
}

interface ArticleCommentThreadProps {
  articleId: number;
}

const ArticleCommentThread: React.FC<ArticleCommentThreadProps> = ({ articleId }) => {
	const [comment, setComment] = useState<Comment[]>([]);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchComment = async() => {
			try {
				const data: CommentData = await getArticleComment({ articleId });
				setComment(data.list);
				setError(null);
			} catch (e) {
				setError(`${e}`);
			}
		};

		fetchComment();
	}, [articleId]);

	if (error) console.log('error');

	return (
		<Container>
			{comment.map((item) => (
				<CommentContainer key={`comment-${item.id}`}>
					<CommentContent>{item.content}</CommentContent>
					<InfoSection>
						<ProfileImg width={40} height={40} />
						<UserDetails>
              <Username>{item.writer.nickname}</Username>
              <Timestamp>{TimestampCal(item.updatedAt)}</Timestamp>
            </UserDetails>
					</InfoSection>

					<Line/>
				</CommentContainer>
			))}

			<BackToMarketPageLink href='/boards'>
        목록으로 돌아가기
        <BackIcon />
      </BackToMarketPageLink>
		</Container>
	);
} 

const Container = styled.div`
	margin-bottom: 40px;
`;

const CommentContainer = styled.div`
  padding: 24px 0;
  position: relative;
`;

const CommentContent = styled.p`
  font-size: 16px;
  line-height: 140%;
  margin-bottom: 24px;
`;

const InfoSection = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

`;

const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const Username = styled.span`
  font-size: 14px;
  color: var(--gray-400);
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

const BackToMarketPageLink = styled(Link)`
	background-color: ${({ theme }) => theme.colors.blue.primary};
	color: ${({ theme }) => theme.colors.white};
	padding: 12px 23px;
	border-radius: 999px;
	font-size: 16px;
	font-weight: bold;
	cursor: pointer;
	max-width: 215px; 

	&:hover {
		background-color: ${({ theme }) => theme.colors.blue.primary};
	}

	&:focus {
		background-color: ${({ theme }) => theme.colors.blue.primary};
	}

  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 18px;
  font-weight: 600;
  margin: 0 auto;
`;

export default ArticleCommentThread;