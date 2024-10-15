import Nav from "../components/Nav";
import ItemDetail from "../components/ItemDetail";

function ItemDetailPage() {
  return (
    <>
      <Nav />
      <main>
        <section>
          <ItemDetail />
        </section>
        <section></section>
      </main>
    </>
  );
}

export default ItemDetailPage;
