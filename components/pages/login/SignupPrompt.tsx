import { useRouter } from 'next/router';
import Link from 'next/link';
import styled from 'styled-components';

import font from '../../../styles/fontStyle.styles';

function SignupPrompt() {
  const router = useRouter();
  const isPathname = router.pathname;

  return (
    <StyledSignupPrompt>
      {isPathname === '/login'
        ? '판다마켓이 처음이신가요?'
        : '이미 회원이신가요?'}
      {isPathname === '/login' ? (
        <StyledLink href='/signup'>회원가입</StyledLink>
      ) : (
        <StyledLink href='/login'>로그인</StyledLink>
      )}
    </StyledSignupPrompt>
  );
}

const StyledSignupPrompt = styled.p`
  text-align: center;
  ${font('14m')}
`;
const StyledLink = styled(Link)`
  ${font('15m')}
  margin-left: .4rem;
  color: #3182f6;
  text-decoration: underline;
`;

export default SignupPrompt;
