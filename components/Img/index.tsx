import Image, { ImageProps } from 'next/image';

/**
 * @interface Props
 * @property {string} Props.src - 이미지 경로
 * @property {string} Props.alt - 이미지 설명
 */
interface Props extends ImageProps {
  src: string;
  alt: string;
}

/**
 * 이미지 로드 실패 시 처리
 * @param e - 실패 이벤트
 */
const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
  e.currentTarget.src = '/images/common/no-image.svg';
};

export default function Img({ src, alt, ...props }: Props) {
  return <Image src={src} alt={alt} {...props} onError={handleError} />;
}
