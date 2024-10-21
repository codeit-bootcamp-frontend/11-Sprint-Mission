import LikeIcon from "../../assets/likes_icon.svg";
import Like from "./Likes.style";

const Likes = ({ item }) => {
  return (
    <Like>
      <i>
        <img src={LikeIcon} alt="좋아요" />
      </i>
      {item.favoriteCount}
    </Like>
  );
};

export default Likes;
