import { useRouter } from 'next/router';
import React from 'react';

const Posts = () => {
  const router = useRouter();
  const { query } = router.query;

  return <div>라우터 {query}</div>;
};

export default Posts;
