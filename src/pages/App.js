import "./App.css";
import Cardlist from "../components/Cardlist";
import { Link } from "react-router-dom";
import myprofile from "../images/myprofile.svg";
import { useEffect, useState } from "react";
import { getProductList } from "../api.js";

const App = () => {
  const [productBestList, setProductBestList] = useState([]);
  const [productList, setProductList] = useState([]);

  const getRoadData = async () => {
    const bestParams = {
      orderBy: "favorite",
      pageSize: 4,
    };

    const listParams = {
      orderBy: "recent",
    };
    const bestList = await getProductList(bestParams);
    const list = await getProductList(listParams);
    console.log(list);
    setProductList(list.list);
    setProductBestList(bestList.list);
  };

  const onChangeSort = async (e) => {
    const order = e.target.value;
    const params = {
      orderBy: order,
    };

    const list = await getProductList(params);
    setProductList(list.list);
  };

  useEffect(() => {
    getRoadData();
  }, []);

  return (
    <div className="container">
      <header>
        <div className="main-header">
          <div className="main-header-left">
            <Link to="">
              <img
                className="image-logo"
                src={require("../images/logo_image.png")}
                alt="판다마켓로고"
              />
            </Link>
            <div className="main-nav">
              <nav>
                <ul>
                  <li className="main-nav-li">
                    <Link className="nav-li" to="/items">
                      자유게시판
                    </Link>
                  </li>
                  <li className="main-nav-li">
                    <Link className="nav-li" to="/items">
                      중고마켓
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
          <img alt="" src={myprofile} width={"40px"} height={"40px"} />
        </div>
      </header>
      <div className="main-content">
        <section>
          <div className="all-product">
            <div className="topbar">
              <div className="topbar-label">베스트 상품</div>
            </div>
            <div className="product-cardlist">
              <Cardlist productBestLists={productBestList} />
            </div>
          </div>
        </section>
        <section>
          <div className="all-product">
            <div className="topbar between">
              <div className="topbar-label">전체 상품</div>
              <div>
                <div className="search-area">
                  <div className="search-box">
                    <Link to="" className="searchGlass"></Link>
                    <input
                      className="search-input"
                      placeholder="검색할 상품을 입력해주세요"
                    ></input>
                  </div>
                  <Link to="/additem" className="btn btn-primary">
                    상품 등록하기
                  </Link>
                  <select name="최신순" onChange={onChangeSort}>
                    최신순
                    <option value="recent">최신순</option>
                    <option value="favorite">좋아요순</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="all-product">
              <div className="product-cardlist fiveRow">
                <Cardlist productBestLists={productList} />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default App;
