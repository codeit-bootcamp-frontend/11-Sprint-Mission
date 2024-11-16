import styles from './Loading.module.css';

interface Props {
  visible: boolean;
}

/**
 * 로딩 표현 컴포넌트
 * @param {boolean} visible : true 이면 보임
 * @return {JSX}
 */
function Loading({ visible = false }: Props) {
  return <>{visible && <div className={styles.loading}></div>}</>;
}

export default Loading;
