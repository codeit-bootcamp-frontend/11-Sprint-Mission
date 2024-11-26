import { useRouter } from 'next/router';
import Link from 'next/link';
import styled from 'styled-components';

import font from '@/styles/fontStyle.styles';
import { media } from '@/styles/media.styles';

function Navigation() {
  const router = useRouter();

  const navLinks = [
    { name: '자유게시판', path: '/boards' },
    { name: '중고마켓', path: '/items' },
  ];

  return (
    <StyledGnb>
      {navLinks.map((link) => {
        const isActive = router.pathname === link.path;

        return (
          <li key={link.name}>
            <StyledLink href={link.path} $isActive={isActive} shallow>
              {link.name}
            </StyledLink>
          </li>
        );
      })}
    </StyledGnb>
  );
}

export default Navigation;

const StyledGnb = styled.ul`
  display: flex;
  flex: 1;
`;

const StyledLink = styled(Link)<{ $isActive: boolean }>`
  color: ${({ $isActive }) =>
    $isActive ? 'var(--blue-100)' : 'var(--gray-600)'};
  padding: 2.1rem 1.5rem;
  ${font('18b')}
  text-align: center;
  text-decoration: none;

  ${media.mo`
    padding: 2.1rem 0.4rem;
    ${font('16b')}
  `}
`;
