import { useState } from "react";
import styles from "./TagsList.module.scss";
import Button from "./Button";

function TagsList({ tags, remove }) {
  const [tagsList, setTagsList] = useState(tags);

  const handleClearTagClick = (tagToRemove) => {
    setTagsList((prevTags) => prevTags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <ul className={styles.tagList}>
      {tagsList.map((tag, index) => (
        <li key={`${tag}-${index}`} className={styles.tagItem}>
          <span>#{tag}</span>
          {remove ? (
            <Button
              link={false}
              className="clear"
              onClick={() => handleClearTagClick(tag)}>
              삭제
            </Button>
          ) : (
            ""
          )}
        </li>
      ))}
    </ul>
  );
}

export default TagsList;
