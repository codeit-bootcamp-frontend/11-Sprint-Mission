import AllItemsSection from '@/components/items/AllItemsSection';
import BestItemSection from '@/components/items/BestItemsSection';

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
