import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { getBoardDetail, getBoardsDetailComments } from '@/services/api';
import useComments from '@/hooks/useComments';

import CommentList from '@/components/shared/Comment/CommentList';
import CommentPost from '@/components/shared/Comment/CommentPost';
import DropDownMenu from '@/components/shared/DropDownMenu';
import Line from '@/components/shared/Line';
import UserInfo from '@/components/shared/UserInfo';
import { Container, Page } from '@/styles/Common.styles';
import styled from 'styled-components';
import { flexColumn } from '@/styles/layout.styles';
import font from '@/styles/fontStyle.styles';
import { media } from '@/styles/media.styles';

interface BorderDetailType {
  title: string;
  content: string;
  writer: {
    nickname: string;
  };
  createdAt: string;
  favoriteCount: number;
}

export default function Board() {
  const [details, setDetails] = useState<BorderDetailType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState<Error | null>(null);

  const router = useRouter();

  const { articleId } = router.query as { articleId?: string };

  const {
    commentsList,
    isLoading: commentLoading,
    error: commentFetchError,
    handleEditSubmit,
    handleDeleteClick,
  } = useComments(getBoardsDetailComments, articleId);

  const fetchBoardItems = useCallback(async () => {
    setIsLoading(true);
    setFetchError(null);
    try {
      const result = await getBoardDetail(articleId);
      if (result) {
        setDetails(result);
      }
    } catch (error) {
      setFetchError(error as Error);
    } finally {
      setIsLoading(false);
    }
  }, [articleId]);

  useEffect(() => {
    if (!router.isReady || !articleId) return;

    fetchBoardItems();
  }, [router.isReady, articleId]);

  if (!details) return console.log('details', details);
  if (isLoading || commentLoading) return <p>로딩 중 입니다...</p>;
  if (fetchError || commentFetchError) return console.log('fetchError', fetchError);

  return (
    <Page>
      <Container>
        <StyledBoardTitleContainer>
          <div className='board-title'>
            <h2>{details.title}</h2>
            <div className='board-title-info'>
              <UserInfo>
                <UserInfo.ProfileImage imageSize='big' />
                <UserInfo.Text userName={details.writer.nickname} date={details.createdAt} />
                <UserInfo.Line column />
                <UserInfo.Heart borderType count={details.favoriteCount} />
              </UserInfo>
            </div>
            <DropDownMenu>
              <DropDownMenu.Item onClick={() => {}}>수정하기</DropDownMenu.Item>
              <DropDownMenu.Item onClick={() => {}}>삭제하기</DropDownMenu.Item>
            </DropDownMenu>
            <Line />
          </div>
          <p>{details.content}</p>
        </StyledBoardTitleContainer>
        <StyledBoardComments>
          <CommentPost title='댓글달기' placeholder='댓글을 입력해주세요' />
          <CommentList
            commentsList={commentsList}
            onEditSubmit={handleEditSubmit}
            onDeleteClick={handleDeleteClick}
            type='comments'
          />
        </StyledBoardComments>
      </Container>
    </Page>
  );
}

const StyledBoardTitleContainer = styled.div`
  ${flexColumn}
  gap: 2.4rem;
  margin-bottom: 3.2rem;
  ${media.ta`
    margin-bottom: 4rem;
    `}
  ${media.mo`
      margin-bottom: 3.2rem;
    `}

  .board-title {
    position: relative;
    ${flexColumn}
    gap: 1.6rem;
    &-info {
      display: flex;
      align-items: flex-end;
    }
  }

  h2 {
    ${font('20b')}
  }

  p {
    ${font('18')}
  }
`;

const StyledBoardComments = styled.div`
  ${flexColumn}
  gap: 4rem;
  ${media.ta`
    gap: 3.2rem;
    `}
  ${media.mo`
      gap: 2.4rem;
    `}
`;
