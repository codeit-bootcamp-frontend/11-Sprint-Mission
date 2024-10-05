import ItemList from "./assets/components/ItemList/ItemList";
import BestItemList from "./assets/components/BestItemList/BestItemList";
import "./App.css";

function App() {
  return (
    <>
      <main className="main-wrapper">
        <BestItemList />
        <ItemList />
      </main>
    </>
  );
}

export default App;
