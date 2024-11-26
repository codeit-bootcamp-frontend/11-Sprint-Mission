import Logo from "@/assets/images/logo/logo.svg";
// import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import { StyledLink } from "@/styles/CommonStyles";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const GlobalHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
`;

const HeaderLogo = styled(Link)`
  margin-right: 16px;

  @media (min-width: 768px) {
    margin-right: 35px;
  }

  @media (min-width: 1280px) {
    margin-right: 47px;
  }
`;

const NavList = styled.ul`
  display: flex;
  list-style: none;
  gap: 8px;
  font-weight: bold;
  font-size: 16px;
  color: var(--gray-600);

  @media (min-width: 768px) {
    gap: 36px;
    font-size: 18px;
  }
`;

const NavItem = styled.li`
  a:hover {
    color: var(--blue);
  }
`;

const LoginLink = styled(StyledLink)``;

function getLinkStyle({ isActive }: { isActive: boolean }) {
  return { color: isActive ? "var(--blue)" : undefined };
}

const Header: React.FC = () => {
  const router = useRouter();

  return (
    <GlobalHeader>
      <HeaderLeft>
        {/* passHref 추가 이유: UX, SEO(Link 태그 안에 텍스트 넣으면 a 태그 생성 -> a 태그에 href 빠지면 UX, SEO 안 좋아짐) */}
        <HeaderLogo href="/" aria-label="홈으로 이동" passHref>
          {/* 이미지 최적화 */}
          <Image src={Logo} alt="판다마켓 로고" width={153} height={51} />
        </HeaderLogo>

        <nav>
          <NavList>
            <NavItem>
              <Link
                href="/community"
                //   style={getLinkStyle}
                passHref
              >
                자유게시판
              </Link>
            </NavItem>
            <NavItem>
              <Link
                href="/items"
                // style={({ isActive }) =>
                //   router.pathname === "/additem" || isActive
                //     ? { color: "var(--blue)" }
                //     : {}
                // }
                passHref
              >
                중고마켓
              </Link>
            </NavItem>
          </NavList>
        </nav>
      </HeaderLeft>

      <LoginLink href="/login" passHref>
        로그인
      </LoginLink>
    </GlobalHeader>
  );
};

export default Header;
