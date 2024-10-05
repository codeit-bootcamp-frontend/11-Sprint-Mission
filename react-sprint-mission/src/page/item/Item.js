import React, { Fragment, useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Item.css";
import axios from "axios";

const imgPath = (fileName) => `${process.env.PUBLIC_URL}/assets${fileName}`;

const BestItems = ({ widthType }) => {
  const [bestItemData, setBestItemData] = useState({ list: [], totalCount: 0 });
  const pageSize = widthType !== "windows" ? (widthType !== "tablit" ? 1 : 2) : 4;
  const getBestItemData = async () => {
    try {
      const res = await axios.get(`https://panda-market-api.vercel.app/products?page=1&pageSize=${pageSize}&orderBy=favorite`);
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
            <img src={imgPath("/common/ic_heart.png")} alt="heart" />
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

/*
  미디어쿼리 적용하여 유동적 화면 구현 필요
  베스트(4, 2, 1), 전체 상품(10, 6, 4)
*/
const Items = ({ widthType }) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [itemData, setItemData] = useState({ list: [], totalCount: 0 });
  const [page, setPage] = useState(1);
  const [orderBy, setOrderBy] = useState("recent"); //favorite
  const [pagenation, setPagenation] = useState([1, 2, 3, 4, 5]);
  const pageSize = widthType !== "windows" ? (widthType !== "tablit" ? 4 : 6) : 10;

  const getItemData = async (pageQuery, pageSizeQuery, orderByQuery, searchQuery = search, searchType) => {
    try {
      let path = `https://panda-market-api.vercel.app/products?page=${pageQuery}&pageSize=${pageSizeQuery}&orderBy=${orderByQuery}`;
      if (searchQuery.length > 0) {
        path = path.concat(`&keyword=${encodeURIComponent(searchQuery)}`);
      }
      const res = await axios.get(path);
      if (res.status === 200) {
        setItemData(res.data);

        const totalPagenation = Math.ceil(res.data.totalCount / pageSize);
        if (searchType === "keyDown") {
          if (totalPagenation < 5) {
            const newPagenation = [];
            for (let i = 0; i < totalPagenation; i++) {
              newPagenation.push(i + 1);
            }
            setPagenation(newPagenation);
            changeButtonStyle(1);
          } else if (pagenation.length !== 5) {
            setPagenation([1, 2, 3, 4, 5]);
            setPage(1);
            changeButtonStyle(1);
          }
        } else {
        }
      }
    } catch (e) {
      console.log("조회 오류");
    }
  };

  const ItemDetail = () => {
    return itemData.list.map((item, idx) => {
      return (
        <div className="itemDetail" key={`item${item.id}`}>
          <img className="itemImg" src={item.images} alt="itemImg" onClick={() => handleDetail(item.id)} />
          <span className="itemName">{item.name}</span>
          <span className="itemPrice">{`${item.price.toLocaleString()}원`}</span>
          <div className="favoriteCount">
            <img src={imgPath("/common/ic_heart.png")} alt="heart" />
            {item.favoriteCount}
          </div>
        </div>
      );
    });
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      getItemData(1, pageSize, orderBy, e.target.value, "keyDown");
    }
  };
  const handleBlur = (e) => {
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

  // 버튼은 < > 포함 7개이며 idx는 1부터 5까지
  const changeButtonStyle = (num) => {
    const pagenationBtn = document.querySelectorAll(".pagenationBtn");
    for (let i = 0; i < pagenationBtn.length; i++) {
      pagenationBtn[i].classList.remove("pagenationBtnSelect");
    }
    pagenationBtn[num].classList.add("pagenationBtnSelect");
  };

  const handlePrevPage = () => {
    const lastPage = pagenation[pagenation.length - 1];
    if (lastPage / 5 > 0 && lastPage > 5) {
      let decreasePagenation = pagenation.map((num) => num - 5);
      const pageCount = decreasePagenation.length;
      if (pageCount < 5) {
        for (let i = 0; i < 5 - pageCount; i++) {
          //마지막 번호로 부터 총 개수가 5가될 때까지 추가
          decreasePagenation.push(decreasePagenation[decreasePagenation.length - 1] + 1);
        }
      }
      setPagenation(decreasePagenation);
      setPage(decreasePagenation[0]);
      changeButtonStyle(1);
    }
  };

  const handleNextPage = () => {
    const lastPage = pagenation[pagenation.length - 1];
    if (lastPage / 5 > 0 && lastPage * 10 < itemData.totalCount) {
      // totalcount 보다 작은 페이지만 필터링
      const increasePagenation = pagenation
        .map((num) => num + 5)
        .filter((num) => {
          return Math.ceil(itemData.totalCount / 10) >= num;
        });
      setPagenation(increasePagenation);
      setPage(increasePagenation[0]);
      changeButtonStyle(1);
    }
  };

  const handleChangePage = (num) => (e) => {
    changeButtonStyle(num);
    setPage(e.target.value);
  };

  useEffect(() => {
    changeButtonStyle(1);
  }, []);

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
            onBlur={handleBlur}
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
        <ItemDetail data={itemData.list.filter((dt, idx) => idx < 4)} />
      </div>
      <div className="pagenation">
        <button className={"pagenationBtn"} key={`pevPageBtn`} onClick={handlePrevPage}>
          {`<`}
        </button>
        {pagenation.map((num, idx) => {
          return (
            <button
              className={`pagenationBtn ${page % 5 === idx + 1 ? "pagenationBtnSelect" : ""}`}
              id={`pageBtn${idx}`}
              key={`pageBtn${idx}`}
              value={num}
              onClick={handleChangePage(idx + 1)}>
              {num}
            </button>
          );
        })}
        <button className={"pagenationBtn"} key={`nextPageBtn`} onClick={handleNextPage}>
          {`>`}
        </button>
      </div>
    </section>
  );
};

function Item(props) {
  const widthType = window.innerWidth < 1199 ? (window.innerWidth < 767 ? "mobile" : "tablit") : "windows";
  return (
    <>
      <header className="navHeader">
        <div className="navigation">
          <div className="itemLogo">
            <Link to={"/"}>
              <img src={imgPath("/common/ic_logo_item_pc.png")} alt="pandaLogo" />
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
            <img src={imgPath("/common/ic_user.png")} alt="userInfo" />
          </Link>
        </div>
      </header>
      <main>
        <BestItems widthType={widthType} />
        <Items widthType={widthType} />
      </main>
    </>
  );
}

export default Item;
