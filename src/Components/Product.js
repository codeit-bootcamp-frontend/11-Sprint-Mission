import iconHeart from '../assets/icon-heart.svg';
import noImage from '../assets/no-image.svg';

export default function Product({ image = noImage, name, price = 0, favoriteCount = 0 }) {
  const handleImageError = (e) => {
    e.target.src = noImage;
  };

  return (
    <div className="flex flex-col gap-2 flex-1">
      <figure className="aspect-square rounded-2xl overflow-hidden">
        <img className="w-full h-full object-cover" src={image} alt={name} onError={handleImageError} />
      </figure>

      <h3 className="text-sm font-medium truncate">{name}</h3>

      <div className="font-bold">{price.toLocaleString()}원</div>

      <div className="flex items-center gap-1 text-xs font-medium">
        <img src={iconHeart} alt="" />
        {favoriteCount}
      </div>
    </div>
  );
}
