import { useState } from "react";
import styles from "./TagsList.module.scss";
import Button from "./Button";

function TagsList() {
  const [tagsList, setTagsList] = useState(["티셔츠", "상의"]);

  const handleClearTagClick = (tagToRemove) => {
    setTagsList((prevTags) => prevTags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <ul className={styles.tagList}>
      {tagsList.map((tag) => (
        <li key={tag.length} className={styles.tagItem}>
          <span>#{tag}</span>
          <Button
            link={false}
            className="clear"
            onClick={() => handleClearTagClick(tag)}>
            삭제
          </Button>
        </li>
      ))}
    </ul>
  );
}

export default TagsList;
