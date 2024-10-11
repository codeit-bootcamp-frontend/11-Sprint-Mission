import { useState } from "react";
import HEART_ICON_IMAGE from "../../assets/ic_heart.svg";
import "./HeartCountArea.scss";

const HeartCountArea = ({ count }) => {
  const [addCount, setAddCount] = useState(0);

  const handleHeartClick = () => setAddCount(addCount + 1);

  return (
    <button className='btn-heart' onClick={handleHeartClick}>
      <div className='ico-heart small'>
        <img src={HEART_ICON_IMAGE} alt='하트 아이콘' />
      </div>
      <span className='count'>{count + addCount}</span>
    </button>
  );
};

export default HeartCountArea;
