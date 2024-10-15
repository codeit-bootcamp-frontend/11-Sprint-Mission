import LikeIcon from "../../assets/likes_icon.svg";

const Likes = () => {
  return (
    <span className="likes">
      <i>
        <img src={LikeIcon} alt="좋아요" />
      </i>
      123
    </span>
  );
};

export default Likes;
