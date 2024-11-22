import "./Mainpage.css";
import { HelmetProvider, Helmet } from "react-helmet-async";

function Mainpage() {
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>판다마켓</title>
        </Helmet>
        <div className="Mainpage-container">
          <h1>메인페이지</h1>
        </div>
      </HelmetProvider>
    </>
  );
}

export default Mainpage;
