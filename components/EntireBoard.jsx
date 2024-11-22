import Image from 'next/image';
import search from '@/public/ic_search.svg';
import example from '@/public/img_example.svg';
import heart from '@/public/ic_heart.svg';
import profile from '@/public/ic_profile.svg';

export default function EntierBoard() {
  return (
    <div className="entire-board-container">
      <div className="entire-board-header">
        <div className="entire-board-title">게시글</div>
        <button type="button" className="small-button">
          글쓰기
        </button>
      </div>
      <div className="entire-board-body">
        <div className="user-select-section">
          <div className='search-bar'>
            <Image src={search} alt="검색" />
            <input placeholder="검색할 상품을 입력해주세요" className="search-bar-input" />
          </div>
          <select >
            <option value="latest">최신순</option>
            <option value="favorite">좋아요순</option>
          </select>
        </div>
        <div className="entire-board-list">
          <div className="board-list-content">
            <div className="list-main-content">
              <div className="list-main-question">맥북 16인치 16기가 1테라정도 사양이면 얼마에 팔아야 하나요?</div>
              <div className="card-body-content-image">
                <Image src={example} alt="맥북" />
              </div>
            </div>
            <div className="list-info">
              <div className="list-info-ahead">
              <div className="board-user-info">
                <Image src={profile} alt="프로필" />
                  <div className="board-user-id">총명한 판다</div>
                  <div className="upload-date">2024. 04. 16</div>
                </div>
                <div className="liked-it">
                  <Image src={heart} alt="좋아요" />
                  <div className="liked-count">9999+</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
