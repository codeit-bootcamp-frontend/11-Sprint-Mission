import { useState } from "react";
import HEART_ICON_IMAGE from "../assets/ic_heart.svg";
import Button from "../components/Button";
import { useProductSettings } from "../context/ProductContext";

const HeartCountArea = ({ count }) => {
  const [addCount, setAddCount] = useState(0);
  const { countSize } = useProductSettings();

  const handleHeartClick = () => setAddCount(addCount + 1);

  return (
    <Button link={false} className='heart' onClick={handleHeartClick}>
      <div className={`ico-heart ${countSize}`}>
        <img src={HEART_ICON_IMAGE} alt='하트 아이콘' />
      </div>
      <span className='count'>{count + addCount}</span>
    </Button>
  );
};

export default HeartCountArea;
