import styles from "./TagsList.module.scss";
import Button from "./Button";

function TagsList({ tags = [], onRemove = null }) {
  return (
    <>
      {tags.length > 0 && (
        <ul className={styles.tagList}>
          {tags.map((tag, index) => (
            <li key={`${tag}-${index}`} className={styles.tagItem}>
              <span>#{tag}</span>
              {onRemove && (
                <Button
                  link={false}
                  className="clear"
                  onClick={() => onRemove(tag)}>
                  삭제
                </Button>
              )}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default TagsList;
