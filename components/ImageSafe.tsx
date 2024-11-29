import Image from "next/image";
import { useState, useEffect } from "react";

const IMAGE_PLACEHOLDER = "/images/landscape-placeholder.svg";

export default function ImageSafe({ src, alt }: { src: string; alt: string }) {
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  useEffect(() => {
    const checkImageConfig = async () => {
      try {
        const res = await fetch(
          "/api/check-image?url=" + encodeURIComponent(src)
        );
        if (res.ok) {
          setImageSrc(src);
        } else {
          setImageSrc(IMAGE_PLACEHOLDER);
        }
      } catch (error) {
        setImageSrc(IMAGE_PLACEHOLDER);
      }
    };

    checkImageConfig();
  }, [src]);

  if (!imageSrc) {
    return null; // 또는 로딩 표시기
  }

  return (
    <Image
      fill
      src={imageSrc}
      alt={alt}
      style={{
        objectFit: "cover",
      }}
    />
  );
}
