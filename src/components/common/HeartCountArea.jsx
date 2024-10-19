import { useState } from "react";
import HEART_ICON_IMAGE from "../../assets/ic_heart.svg";
import "./HeartCountArea.scss";

const HeartCountArea = ({ count = 0, styles = "small", className = "" }) => {
  const [addCount, setAddCount] = useState(0);

  const handleHeartClick = () => setAddCount(addCount + 1);

  return (
    <button
      className={`btn-heart ${styles} ${className}`}
      onClick={handleHeartClick}>
      <div className="ico-heart">
        <img src={HEART_ICON_IMAGE} alt="하트 아이콘" />
      </div>
      <span className="count">{count + addCount}</span>
    </button>
  );
};

export default HeartCountArea;
