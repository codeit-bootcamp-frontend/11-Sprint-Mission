import { useState } from "react";
import HeartCountArea from "../components/common/HeartCountArea";
import Images from "../components/common/Images";
import TagsList from "../components/common/TagsList";

function ProductDetails() {
  const [text, setText] = useState("Some initial text");
  return (
    <main className="page-productDetails">
      <div className="container">
        <div className="product-detail-area">
          <Images
            imageSize={{
              pcSize: "big",
              tabletSize: "big-large",
              mobileSize: "big-large",
            }}
            classNames="product-detail-images"
            src="http://placehold.it/600x600"
            alt="상품 이미지"
          />
          <div className="product-detail-text-area">
            <div className="btn-more">
              <div className="toggle">
                <img src="" alt="" />
              </div>
              <ul className="more-list">
                <li className="more-item">
                  <button className="btn-remove">수정하기</button>
                </li>
                <li className="more-item">
                  <button className="btn-delete">삭제하기</button>
                </li>
              </ul>
            </div>
            <div className="product-detail-text">
              <h2 className="product-detail-title">아이패드 미니 팔아요</h2>
              <p className="product-detail-price">500,000원</p>
            </div>
            <div className="product-detail-text">
              <h3 className="product-detail-title-sub">상품 소개</h3>
              <p className="product-detail-text-p">
                액정에 잔기스랑 주변부 스크래치있습니다만 예민하신분아니면 전혀
                신경쓰이지않을정도입니다. 박스 보관중입니다. 메모용과
                넷플릭스용으로만쓰던거라 뭘 해보질 않아 기능이나 문제점을
                못느꼈네요 잘 안써서 싸게넘깁니다! 택배거래안합니다.
              </p>
            </div>
            <div className="product-detail-text">
              <h3 className="product-detail-title-sub">상품 태그</h3>
              <TagsList
                tags={["아이패드미니", "애플", "가성비"]}
                remove={false}
              />
            </div>
            <div>
              <div className="user-information">
                <div className="user-profile">유저 프로필</div>
                <div className="user-information-details">
                  <p className="user-nickName">총명한판다</p>
                  <span className="date-creation">2024. 01. 02</span>
                </div>
              </div>
              <HeartCountArea count="123" />
            </div>
          </div>
        </div>
        <div className="inquiry-form">
          <h4>문의하기</h4>
          <form>
            <textarea
              value={text}
              name="inquiry"
              placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
              onChange={(e) => setText(e.target.value)}
            />
            <button className="btn-inquiry">등록</button>
          </form>
        </div>
        <ul className="inquiry-list">
          <li className="inquiry-item">
            <div className="inquiry-form">
              <form>
                <textarea
                  value={text}
                  name="inquiry"
                  placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
                  onChange={(e) => setText(e.target.value)}
                />
                <div>
                  <div className="user-information">
                    <div className="user-profile">유저 프로필</div>
                    <div className="user-information-details">
                      <p className="user-nickName">똑똑한판다</p>
                      <span className="date-creation">1시간 전</span>
                    </div>
                  </div>
                  <button className="btn-cancel">취소</button>
                  <button className="btn-remove-success">수정 완료</button>
                </div>
              </form>
            </div>
          </li>
          <li className="inquiry-item">
            <div className="btn-more">
              <div className="toggle">
                <img src="" alt="" />
              </div>
              <ul className="more-list">
                <li className="more-item">
                  <button className="btn-remove">수정하기</button>
                </li>
                <li className="more-item">
                  <button className="btn-delete">삭제하기</button>
                </li>
              </ul>
            </div>
            <p className="inquiries">혹시 사용기간이 어떻게 되실까요?</p>
            <div className="user-information">
              <div className="user-profile">유저 프로필</div>
              <div className="user-information-details">
                <p className="user-nickName">똑똑한판다</p>
                <span className="date-creation">1시간 전</span>
              </div>
            </div>
          </li>
          <li className="inquiry-item">
            <div className="btn-more">
              <div className="toggle">
                <img src="" alt="" />
              </div>
              <ul className="more-list">
                <li className="more-item">
                  <button className="btn-remove">수정하기</button>
                </li>
                <li className="more-item">
                  <button className="btn-delete">삭제하기</button>
                </li>
              </ul>
            </div>
            <p className="inquiries">혹시 사용기간이 어떻게 되실까요?</p>
            <div className="user-information">
              <div className="user-profile">유저 프로필</div>
              <div className="user-information-details">
                <p className="user-nickName">똑똑한판다</p>
                <span className="date-creation">1시간 전</span>
              </div>
            </div>
          </li>
          <li className="inquiry-item">
            <div className="btn-more">
              <div className="toggle">
                <img src="" alt="" />
              </div>
              <ul className="more-list">
                <li className="more-item">
                  <button className="btn-remove">수정하기</button>
                </li>
                <li className="more-item">
                  <button className="btn-delete">삭제하기</button>
                </li>
              </ul>
            </div>
            <p className="inquiries">혹시 사용기간이 어떻게 되실까요?</p>
            <div className="user-information">
              <div className="user-profile">유저 프로필</div>
              <div className="user-information-details">
                <p className="user-nickName">똑똑한판다</p>
                <span className="date-creation">1시간 전</span>
              </div>
            </div>
          </li>
        </ul>
        <div className="inquiry-list-not">
          <img src="" alt="" />
          <p>아직 문의가 없어요</p>
        </div>
        <button className="btn-return">목록으로 돌아가기</button>
      </div>
    </main>
  );
}

export default ProductDetails;
