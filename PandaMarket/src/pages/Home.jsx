import { Link } from "react-router-dom";
import { MainHeader } from "../layouts/Header";

const Home = () => {
  return (
    <>
      <MainHeader />
      <Link to="./items">중고마켓 이동</Link>
    </>
  );
};

export default Home;
