import styles from "./HeadingTitleArea.module.scss";

function HeadingTitleArea({ children }) {
  return <div className={styles.heading}>{children}</div>;
}

export default HeadingTitleArea;
