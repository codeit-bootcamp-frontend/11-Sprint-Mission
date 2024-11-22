import styled from 'styled-components';
import { Container } from '../../styles/Common.styles';
import font from '@/styles/fontStyle.styles';
import { media } from '@/styles/media.styles';

const ICON_FACEBOOK = '/ic_facebook.png';
const ICON_INSTAGRAM = '/ic_instagram.png';
const ICON_TWITTER = '/ic_twitter.png';
const ICON_YOUTUBE = '/ic_youtube.png';
import Link from 'next/link';
import IconLink from '../shared/IconLink';

const snsLink = [
  {
    id: 1,
    name: 'facebook',
    to: 'https://www.facebook.com/',
    src: ICON_FACEBOOK,
  },
  { id: 2, name: 'twitter', to: 'https://x.com/', src: ICON_TWITTER },
  {
    id: 3,
    name: 'youtube',
    to: 'https://www.youtube.com/',
    src: ICON_YOUTUBE,
  },
  {
    id: 4,
    name: 'instagram',
    to: 'https://www.instagram.com/',
    src: ICON_INSTAGRAM,
  },
];

function Footer() {
  return (
    <StyledFooter>
      <FooterContainer>
        <FooterItem className='text-copyright'>
          <p>©codeit - 2024</p>
        </FooterItem>
        <FooterItem className='link-page'>
          <Link href='/privacy'>Privacy Policy</Link>
          <Link href='/faq'>FAQ</Link>
        </FooterItem>
        <FooterItem className='link-sns'>
          {snsLink.map((sns) => (
            <IconLink key={sns.id} to={sns.to} name={sns.name} src={sns.src} />
          ))}
        </FooterItem>
      </FooterContainer>
    </StyledFooter>
  );
}

export default Footer;

export const StyledFooter = styled.footer`
  height: 16rem;
  padding-top: 3.2rem;
  background-color: var(--gray-900);
`;

export const FooterContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
  ${media.mo`
    flex-wrap: wrap;
    gap: 2.5rem 0;
    justify-content: center;
  `}
`;

export const FooterItem = styled.div`
  ${font('16')}
  ${media.mo`
    flex-basis: 100%;
  `}
  &.text-copyright {
    ${media.mo`
      order: 2;
      flex: 1;
    `}
    p {
      color: var(--gray-400);
      ${media.mo`
        color: #676767;
      `}
    }
  }
  &.link-page {
    display: flex;
    gap: 3rem;
    ${media.mo`
      flex: 1;
      flex-basis: 50%;
    `}
    a {
      color: var(--gray-200);
      ${media.mo`
        color: #cfcfcf;
      `}
    }
  }
  &.link-sns {
    display: flex;
    gap: 1.2rem;
    ${media.mo`
      flex: 1;
      flex-basis: 50%;
      justify-content: flex-end;
    `}
  }
`;
