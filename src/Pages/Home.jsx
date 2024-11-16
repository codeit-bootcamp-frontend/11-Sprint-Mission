import Meta from '../Components/Meta';

function Home({ title, desc }) {
  return (
    <>
      <Meta title={title} description={desc} />
      <h1>Home page</h1>
    </>
  );
}

export default Home;
