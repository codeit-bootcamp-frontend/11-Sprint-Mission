import { useRouter } from 'next/router';

export default function Board() {
  const router = useRouter();
  const { id } = router.query;

  return <div>Board: {id}</div>;
}
