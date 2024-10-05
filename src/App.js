import ItemList from "./assets/components/ItemList/ItemList";
import BestItemList from "./assets/components/BestItemList/BestItemList";
import "./App.css";
import Navigation from "./assets/components/Navigation/Navigation";

function App() {
  return (
    <>
      <header>
        <Navigation />
      </header>
      <main className="main-wrapper">
        <BestItemList />
        <ItemList />
      </main>
    </>
  );
}

export default App;
