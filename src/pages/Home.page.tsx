import Meta from '../components/Meta';

interface Props {
  title: string;
  desc: string;
}

export default function Home({ title, desc }: Props) {
  return (
    <>
      <Meta title={title} description={desc} />
      <h1>Home</h1>
    </>
  );
}
