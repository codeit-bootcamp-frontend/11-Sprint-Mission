import { Link } from "react-router-dom";
import { MainHeader } from "../layouts/Header";

const style = {
  fontSize: "24px",
  color: "var(--blue)",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

const Home = () => {
  return (
    <>
      <MainHeader />
      <Link to="./items" style={style}>
        중고마켓 이동
      </Link>
    </>
  );
};

export default Home;
