import { StyledTagsList } from './TagsList.styles';

import Tag from './Tag';

function TagsList({ tags = [], onRemove = null }) {
  return (
    <>
      {tags.length > 0 && (
        <StyledTagsList>
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
