import { StyledTagsList } from './TagsList.styles';

import Tag from './Tag';

export interface TagsListProps {
  tags?: string[];
  onRemove: (tag: string) => void;
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
