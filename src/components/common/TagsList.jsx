import { useState } from "react";
import ButtonClose from "./ButtonClose";
import styles from "./TagsList.module.scss";

function TagsList() {
  const [tagsList, setTagsList] = useState(["티셔츠", "상의"]);

  const handleRemoveTag = (tagToRemove) => {
    setTagsList((prevTags) => prevTags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <ul className={styles.tagList}>
      {tagsList.map((tag) => (
        <li key={tag.length} className={styles.tagItem}>
          <span>#{tag}</span>
          <ButtonClose onClick={() => handleRemoveTag(tag)} />
        </li>
      ))}
    </ul>
  );
}

export default TagsList;
