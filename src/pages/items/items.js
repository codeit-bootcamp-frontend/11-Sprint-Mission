import { getItem } from "../../api";
import { useState, useEffect } from "react";
import FavoriteItemList from "../../components/FavoriteItemList/FavoriteItemList";
import Banner from "../../components/Banner/Banner";
// import "./Items.css";

function Items() {
  const [items, setItems] = useState([]);
  const [sortOption, setSortOption] = useState("createdAt");

  const sortedItems = items.sort((a, b) => b[sortOption] - a[sortOption]);

  const handleLoad = async () => {
    const { list } = await getItem();
    setItems(list);
  };

  useEffect(() => {
    handleLoad();
  }, []);

  return (
    <div>
      <Banner />
      <main>
        <section>
          <p>베스트 상품</p>
          <FavoriteItemList items={sortedItems} />
        </section>
        <section>
          <p>전체상품</p>
          <input />
          <button>상품 등록하기</button>
          <div>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="최신 순">최신 순</option>
              <option value="좋아요 순">좋아요 순</option>
            </select>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Items;
