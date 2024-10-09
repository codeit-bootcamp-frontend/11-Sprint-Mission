import "./App.css";
import Header from "./components/Header";
import BestItem from "./components/BestItem";
import Alltem from "./components/Alltem";
function App() {
  return (
    <div className="app-container">
      <Header />
      <section className="best-section">
        <BestItem />
      </section>
      <section className="all-section">
        <Alltem />
      </section>
    </div>
  );
}

export default App;
