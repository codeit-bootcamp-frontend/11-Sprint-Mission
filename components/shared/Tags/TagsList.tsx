import styled from 'styled-components';

import Tag from './Tag';

export interface TagsListProps {
  tags?: string[];
  onRemove?: (tag: string) => void;
}

function TagsList({ tags = [], onRemove }: TagsListProps) {
  const hasOnRemove = !!onRemove;

  return (
    <>
      {tags.length > 0 && (
        <StyledTagsList hasOnRemove={hasOnRemove}>
          {tags.map((tag, index) => (
            <li key={`${tag}-${index}`}>
              <Tag tag={tag} onRemove={onRemove} />
            </li>
          ))}
        </StyledTagsList>
      )}
    </>
  );
}

export default TagsList;

interface StyledTagsListProps {
  hasOnRemove: boolean;
}

const StyledTagsList = styled.ul.withConfig({
  shouldForwardProp: (prop) => !['hasOnRemove'].includes(prop),
})<StyledTagsListProps>`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ hasOnRemove }) => (hasOnRemove ? '0.8rem' : '1.2rem')};
`;
