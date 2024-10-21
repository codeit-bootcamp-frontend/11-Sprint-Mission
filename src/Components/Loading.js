import styles from './Loading.module.css';

/**
 * 로딩 표현 컴포넌트
 * @param {boolean} visible : true 이면 보임
 * @return {JSX}
 */
function Loading({ visible = false }) {
  return <>{visible && <div className={styles.loading}></div>}</>;
}

export default Loading;
