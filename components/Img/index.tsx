import Image, { ImageProps } from 'next/image';
import NoImage from '@/public/images/common/no-image.svg?url';

/**
 * @interface Props
 * @property {string} Props.src - 이미지 경로
 * @property {string} Props.alt - 이미지 설명
 */
interface Props extends ImageProps {
  useImg?: boolean;
  src: string;
  alt: string;
}

/**
 * 이미지 로드 실패 시 처리
 * @param e - 실패 이벤트
 */
const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
  e.currentTarget.src = NoImage.src;
};

export default function Img({ useImg = false, src, alt = '', ...props }: Props) {
  const imgProps = {
    src: src || NoImage,
    alt,
    onError: handleError,
    ...props,
  };

  return useImg ? (
    <img {...imgProps} />
  ) : (
    <Image
      placeholder="blur"
      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
      {...imgProps}
    />
  );
}
