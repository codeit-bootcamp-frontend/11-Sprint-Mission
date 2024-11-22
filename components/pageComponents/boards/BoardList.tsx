import Link from 'next/link';
import { styled } from 'styled-components';

import { flexColumn } from '@/styles/layout.styles';

import BoardItem from './BoardItem';
import { BoardCardListProps } from './BoardCardList';

function BoardList({ list = [] }: BoardCardListProps) {
  return (
    <BoardListUl>
      {list.map((item) => (
        <li key={item.id}>
          <Link href={`/board/${item.id}`}>
            <BoardItem
              title={item.title}
              likeCount={item.likeCount}
              updatedAt={item.updatedAt}
              writer={item.writer}
              image={item.image}
            />
          </Link>
        </li>
      ))}
    </BoardListUl>
  );
}

const BoardListUl = styled.ul`
  ${flexColumn}
  gap: 2.4rem;
  a {
    width: 100%;
  }
`;

export default BoardList;
