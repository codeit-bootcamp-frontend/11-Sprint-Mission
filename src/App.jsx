import "./App.css";
import Header from "./components/Header";
import BestItem from "./components/BestItem";
import Allitem from "./components/Allitem";
function App() {
  return (
    <div className="app-container">
      <Header />
      <section className="best-section">
        <BestItem />
      </section>
      <section className="all-section">
        <Allitem />
      </section>
    </div>
  );
}

export default App;