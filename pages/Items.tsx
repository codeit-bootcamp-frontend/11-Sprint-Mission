import AllItemsSection from '@components/AllItemsSection';
import BestItemSection from '@components/BestItemsSection';

function Items() {
  return (
    <div>
      <div className="itempagecontainer">
        <BestItemSection />
        <AllItemsSection />
      </div>
    </div>
  );
}

export default Items;
