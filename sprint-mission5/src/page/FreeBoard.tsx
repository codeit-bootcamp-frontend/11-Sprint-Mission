import "./FreeBoard.css";
import { HelmetProvider, Helmet } from "react-helmet-async";

function FreeBoard() {
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>자유게시판</title>
        </Helmet>
        <div className="FreeBoard-container">
          <h1>자유게시판</h1>
        </div>
      </HelmetProvider>
    </>
  );
}

export default FreeBoard;
