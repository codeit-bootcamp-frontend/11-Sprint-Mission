import BestItemList from "../components/BestItemList/BestItemList";
import ItemList from "../components/ItemList/ItemList";

function ItemListPage({ view }) {
  return (
    <main className="main-wrapper">
      <BestItemList view={view} />
      <ItemList view={view} />
    </main>
  );
}

export default ItemListPage;
