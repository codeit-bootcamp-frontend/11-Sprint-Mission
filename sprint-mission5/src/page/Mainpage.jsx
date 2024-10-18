import "./Mainpage.css";
import { Helmet } from "react-helmet";

function Mainpage() {
  return (
    <>
      <Helmet>
        <title>판다마켓</title>
      </Helmet>
      <div className="Mainpage-container">
        <h1>메인페이지</h1>
      </div>
    </>
  );
}

export default Mainpage;
