import Link from "next/link";
import Image from "next/image";

export default function Nav() {
  return (
    <nav className="nav-container">
      <div className="nav-bar">
        <div className="nav-front">
          <Link href="/index" className="nav-logo">
            <Image
              src="/svgs/판다 얼굴.svg"
              alt="판다얼굴"
              width={40}
              height={40}
            />
            <Image
              src="/svgs/판다마켓.svg"
              alt="판다마켓 로고"
              width={100}
              height={50}
            />
          </Link>

          <div className="nav-board">
            <Link href="/board" className="nav-board-free-board">
              자유게시판
            </Link>
            <Link href="/items" className="nav-board-used-market">
              중고마켓
            </Link>
          </div>
        </div>

        <Link href="/profile" className="nav-icon">
          <Image
            src="/svgs/Frame 2609463.svg"
            alt="프로필 아이콘"
            width={40}
            height={40}
          />
        </Link>
      </div>
    </nav>
  );
}
