import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '@/styles/NotFound.module.css';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404</h1>
      <h2 className={styles.lead}>페이지를 찾을 수 없습니다.</h2>
      <p className="mb-10">요청하신 페이지가 사라졌거나, 잘못된 경로를 이용하셨습니다.</p>

      <div className={styles.btns}>
        <Link href="/" className="btn">
          홈으로 이동
        </Link>
        <button className="btn btn-outline" onClick={() => router.back()}>
          뒤로 가기
        </button>
      </div>
    </div>
  );
}
