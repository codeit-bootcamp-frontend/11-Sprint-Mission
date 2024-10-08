import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Item.css";
import { getAxios } from "utils/api";
import { showInitialDeviceItems } from "utils/initialDevice ";
import { Pagenation, ChangeButtonStyle, ImgPath } from "components";

const BestItems = () => {
  const [bestItemData, setBestItemData] = useState({ list: [], totalCount: 0 });
  const getBestItemData = async () => {
    try {
      const res = await getAxios({
        page: 1,
        pageSize: showInitialDeviceItems("best"),
        orderBy: "favorite",
      });
      if (res.status === 200) {
        setBestItemData(res.data);
      }
    } catch (e) {
      console.log("조회 오류");
    }
  };

  useEffect(() => {
    getBestItemData();
  }, []);

  const handleDetail = (id) => {
    console.log(`${id}-상세 상품`);
  };

  const BestItemDetail = () => {
    return bestItemData.list.map((item) => {
      return (
        <div className="bestItemDetail" key={`bestItem${item.id}`}>
          <img className="bestItemImg" src={item.images} alt="itemImg" onClick={() => handleDetail(item.id)} />
          <span className="itemName">{item.name}</span>
          <span className="itemPrice">{`${item.price.toLocaleString()}원`}</span>
          <div className="favoriteCount">
            <img src={ImgPath("/common/ic_heart.png")} alt="heart" />
            {item.favoriteCount}
          </div>
        </div>
      );
    });
  };

  return (
    <section className="itemSection">
      <div className="itemContentsTitle">
        <h3>베스트 상품</h3>
      </div>
      <div className="itemContentsForm">
        <BestItemDetail />
      </div>
    </section>
  );
};

const Items = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [itemData, setItemData] = useState({ itemList: [], totalCount: 0 });
  const [page, setPage] = useState(1);
  const [orderBy, setOrderBy] = useState("recent"); //favorite
  const pageSize = showInitialDeviceItems();

  const getItemData = async (pageQuery, pageSizeQuery, orderByQuery, searchQuery = search, searchType) => {
    try {
      let parmas = {
        page: pageQuery,
        pageSize: pageSizeQuery,
        orderBy: orderByQuery,
      };

      if (searchQuery.length > 0) {
        parmas = { ...parmas, keyword: searchQuery };
      }

      const res = await getAxios(parmas);
      if (res.status === 200) {
        setItemData({
          itemList: res.data.list,
          totalCount: res.data.totalCount,
        });

        if (searchType === "keyDown") {
          setPage(1);
          ChangeButtonStyle(1);
        }
      }
    } catch (e) {
      console.log("조회 오류");
    }
  };

  const ItemDetail = () => {
    return itemData.itemList.map((item, idx) => {
      return (
        <div className="itemDetail" key={`item${item.id}`}>
          <img className="itemImg" src={item.images} alt="itemImg" onClick={() => handleDetail(item.id)} />
          <span className="itemName">{item.name}</span>
          <span className="itemPrice">{`${item.price.toLocaleString()}원`}</span>
          <div className="favoriteCount">
            <img src={ImgPath("/common/ic_heart.png")} alt="heart" />
            {item.favoriteCount}
          </div>
        </div>
      );
    });
  };

  const handleKeyDown = (e) => {
    if (e.type === "keydown" && e.keyCode !== 13) return;
    getItemData(1, pageSize, orderBy, e.target.value, "keyDown");
  };

  const handleChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleChangeSelect = (e) => {
    setOrderBy(e.target.value);
  };

  const handleDetail = () => {
    navigate("/");
  };

  const handleChangePage = (pageNum) => {
    setPage(pageNum);
  };

  useEffect(() => {
    getItemData(page, pageSize, orderBy);
  }, [page, pageSize, orderBy]);

  return (
    <section className="itemSection">
      <div className="itemContentsTitle">
        <h3>전체 상품</h3>
        <div className="contentsSearch">
          <input
            className="inputBox"
            type="text"
            placeholder="검색할 상품을 입력해주세요."
            value={search}
            onChange={handleChangeSearch}
            onKeyDown={handleKeyDown}
          />
          <button className="addItemBtn">
            <Link to="/AddItem">상품 등록하기</Link>
          </button>
          <select id="itemSelect" className="selectBox" value={orderBy} onChange={handleChangeSelect}>
            <option value="recent">최신순</option>
            <option value="favorite">좋아요순</option>
          </select>
        </div>
      </div>
      <div className="itemContentsFormSmall">
        <ItemDetail />
      </div>
      <Pagenation totalCount={itemData.totalCount} pageChange={handleChangePage} />
    </section>
  );
};

function Item(props) {
  return (
    <>
      <header className="navHeader">
        <div className="navigation">
          <div className="itemLogo">
            <Link to={"/"}>
              <img src={ImgPath("/common/ic_logo_item_pc.png")} alt="pandaLogo" />
            </Link>
          </div>
          <div className="navNoticeBoard">
            <Link to={"/noticeBoard"}>자유 게시판</Link>
          </div>
          <div className="navMarket">
            <Link to={"/market"}>중고 마켓</Link>
          </div>
        </div>
        <div className="userInfo">
          <Link to={"/userInfo"} className="navMarket">
            <img src={ImgPath("/common/ic_user.png")} alt="userInfo" />
          </Link>
        </div>
      </header>
      <main>
        <BestItems />
        <Items />
      </main>
    </>
  );
}

export default Item;
