import Link from 'next/link';
import styled from 'styled-components';
import Image, { StaticImageData } from 'next/image';

interface IconLinkProps {
  to: string;
  name: string;
  src: string | StaticImageData;
  size?: 'sm' | 'md';
}

function IconLink({ to = '', name = 'facebook', src = '', size = 'sm' }: IconLinkProps) {
  return (
    <StyledIconLink href={to} target='_blank' $size={size}>
      <Image src={src} alt={`${name} 아이콘`} width={180} height={180} />
    </StyledIconLink>
  );
}

export default IconLink;

type SizeKey = keyof typeof size;

type StyledIconLinkProps = {
  $size: SizeKey;
};

const size = {
  sm: '1.8rem',
  md: '4.2rem',
} as const;

export const StyledIconLink = styled(Link)<StyledIconLinkProps>`
  display: inline-block;
  font-size: 0;
  line-height: 0;
  width: ${({ $size }) => size[$size]};
  height: ${({ $size }) => size[$size]};
`;
