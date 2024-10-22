import Header from "../components/Header";
import BestItemsList from "../components/BestItemsList";
import ItemsList from "../components/ItemsList";

function Item() {
  return (
    <div>
      {/* 배열을 렌더링해줄 때는 key 값이 필요 */}
      <Header isLogined={true} isMain={true} />
      <section>
        <BestItemsList />
        <ItemsList />
      </section>
    </div>
  );
}

export default Item;
