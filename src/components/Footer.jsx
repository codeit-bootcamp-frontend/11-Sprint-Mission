import React from "react";

function Footer() {
  return (
    <footer>
      <div className="footer-wrap">
        <div className="corp">©codeit - 2024</div>
        <div className="links">
          <a href="pages/privacy.html" title="Privacy Policy 페이지 이동">
            Privacy Policy
          </a>
          <a href="pages/faq.html" title="FAQ 페이지 이동">
            FAQ
          </a>
        </div>
        <div className="sns">
          <a href="https://www.facebook.com" title="페이스북 바로가기">
            <img src="/images/icons/ic_facebook.png" alt="페이스북" />
          </a>
          <a href="https://x.com" title="트위터 이동">
            <img src="/images/icons/ic_twitter.png" alt="트위터" />
          </a>
          <a href="https://www.youtube.com" title="유튜브 이동">
            <img src="/images/icons/ic_youtube.png" alt="유튜브" />
          </a>
          <a href="https://www.instagram.com" title="인스타그램 이동">
            <img src="/images/icons/ic_instagram.png" alt="인스타그램" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
