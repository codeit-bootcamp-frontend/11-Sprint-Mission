import { useRouter } from 'next/router';
import styled from 'styled-components';
import { useAuth } from '@/context/AuthContext';

import { Container } from '@/styles/Common.styles';
import { media } from '@/styles/media.styles';

import Navigation from './Navigation';
import ProfileImage from '../shared/ProfileImage';
import Logo from '../shared/Logo';
import Button from '../shared/Button';
import font from '@/styles/fontStyle.styles';

function Headers() {
  const router = useRouter();
  const { hasLogin } = useAuth();

  return (
    <HeaderContainer>
      <StlyedContainer>
        <Logo size='sm' />
        {router.pathname !== '/' && <Navigation />}
        {hasLogin ? (
          <>
            <ProfileImage />
          </>
        ) : (
          <Button href='/login' color='blue' size='medium' className='header-btn'>
            로그인
          </Button>
        )}
      </StlyedContainer>
    </HeaderContainer>
  );
}

export default Headers;

const HeaderContainer = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 7rem;
  border-bottom: 1px solid #dfdfdf;
  background-color: #fff;
  z-index: 999;
`;

const StlyedContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  gap: 3.2rem;

  ${media.mo`
    gap: 0.8rem;

    .header-btn{
      padding: 0.8rem 1.6rem;
      ${font('16sb')};
    }
  `}
`;
