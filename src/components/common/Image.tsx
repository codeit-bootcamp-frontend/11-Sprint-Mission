import { useState } from "react";

interface Props {
  images: string[];
  name: string;
}

function Image({ images, name }: Props) {
  const image = images?.[0] || "/images/icons/ic_no_image.svg"; // 등록된 이미지가 없는 경우 대체 이미지(ic_no_image) 노출
  const [imageRenderError, setImageRenderError] = useState(false);

  return (
    <div className='img-wrap'>
      <img
        src={imageRenderError ? "/images/icons/ic_no_image.svg" : image}
        alt={name || "product image"}
        onError={() => setImageRenderError(true)}
      />
    </div>
  );
}

export default Image;
