import Image from 'next/image';
import medal from '@/public/ic_medal.svg';
import example from '@/public/img_example.svg';
import heart from '@/public/ic_heart.svg';

export default function BestBoard() {
  return (
    <div className="best-board-container">
      <div className="best-board-title">베스트 게시글</div>
      <div className="best-board-card">
        <div className="card-content">
          <div className="card-head">
            <Image src={medal} alt="메달" />
            <div className="card-head-title">Best</div>
          </div>
          <div className="card-body">
            <div className="card-body-content">
              맥북 16기가 1테라 정도
              사양이면 얼마에 팔아야 하나요?
            </div>
            <div className="card-body-content-image">
              <Image src={example} alt="맥북" />
            </div>
          </div>
          <div className="card-bottom">
            <div className="card-bottom-ahead">
              <div className="board-user-id">총명한 판다</div>
              <div className="like-it">
                <Image src={heart} alt="좋아요" />
                <div className="like-count">9999+</div>
              </div>
            </div>
            <div className="upload-date">2024. 04. 16</div>
          </div>
        </div>
      </div>
    </div>
  );
}
