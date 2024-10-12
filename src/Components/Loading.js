import styles from './Loading.module.css';

export default function Loading({ visible = false }) {
  return <>{visible && <div className={styles.loading}></div>}</>;
}
