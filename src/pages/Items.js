import AllItemsSection from '../components/AllItemsSection';
import BestItemSection from '../components/BestItemsSection';
import Navbar from '../components/Navbar';

function Items() {
  return (
    <div>
      <Navbar />
      <div className="itempagecontainer">
        <BestItemSection />
        <AllItemsSection />
      </div>
    </div>
  );
}

export default Items;
