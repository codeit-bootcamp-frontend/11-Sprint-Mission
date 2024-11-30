import styled from 'styled-components';
import font from '@/styles/fontStyle.styles';

import IconLink from '@/components/shared/IconLink';

const ICON_GOOGLE = '/icon-google.png';
const ICON_KAKAO = '/icon-kakao.png';

function Alternative() {
  return (
    <StyledLogin>
      <p>간편 로그인하기</p>
      <IconLink to='https://www.google.com/' name='google' src={ICON_GOOGLE} size='md' />
      <IconLink to='https://www.kakaocorp.com/page/' name='google' src={ICON_KAKAO} size='md' />
    </StyledLogin>
  );
}

export default Alternative;

const StyledLogin = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
  width: 100%;
  padding: 1.6rem 2.3rem;
  ${font('16m')}
  color: var(--gray-800);
  border-radius: 0.8rem;
  background-color: var(--blue-50);
  margin: 2.4rem 0;
  p {
    flex: 1;
  }
`;
