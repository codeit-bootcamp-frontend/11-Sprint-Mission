import "../App.css";
import BestItem from "../components/BestItem";
import Allitem from "../components/Allitem";
import { HelmetProvider, Helmet } from "react-helmet-async";

function ItemContainer() {
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>중고마켓</title>
        </Helmet>
        <div className="app-container">
          <section className="items-wrap-section">
            <section className="best-section">
              <BestItem />
            </section>
            <section className="all-section">
              <Allitem />
            </section>
          </section>
        </div>
      </HelmetProvider>
    </>
  );
}
export default ItemContainer;
