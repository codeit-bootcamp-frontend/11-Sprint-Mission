import BestItem from "./BestItem";
import Navbar from "./Navbar";
import AllItems from "./AllItems";
import "./css/App.css";

function App() {
  return (
    <div>
      <Navbar />
      <div className="itemPage">
        <BestItem />
        <AllItems />
      </div>
    </div>
  );
}

export default App;
