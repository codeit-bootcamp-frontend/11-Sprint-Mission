import HEART_ICON_IMAGE from "../assets/ic_heart.svg";

const HeartCountArea = ({ count, size }) => {
  return (
    <div className='favorite-count'>
      <div className={`ico-heart ${size}`}>
        <img src={HEART_ICON_IMAGE} alt='하트 아이콘' />
      </div>
      <span>{count}</span>
    </div>
  );
};

export default HeartCountArea;
