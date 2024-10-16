import { Link } from "react-router-dom";
import Nav from "../components/Nav";
import ItemDescription from "../components/ItemDescription";
import AskItem from "../components/AskItem";
import BackIcon from "../assets/icons/ic_back.svg";

function ItemDescriptionPage() {
  return (
    <>
      <Nav />
      <main>
        <article>
          <ItemDescription />
        </article>
        <section>
          <AskItem />
        </section>
        <Link to="/items">
          <button>
            <p>목록으로 돌아가기</p>
          </button>
          <img src={BackIcon} alt="목록으로 돌아가기" />
        </Link>
      </main>
    </>
  );
}

export default ItemDescriptionPage;
