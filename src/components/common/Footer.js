import React from "react";
import { Link } from "react-router-dom";
import "../css/Footer.css";
import twitterIcon from "../../images/icon/ic_twitter.png";
import youtubeIcon from "../../images/icon/ic_youtube.png";
import instagramIcon from "../../images/icon/ic_instagram.png";
import facebookIcon from "../../images/icon/ic_facebook.png";
import LinkComponent from "./LinkComponent";

const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-txt">©codeit - 2024</div>
        <div className="footer-page">
          <Link href="">Privacy Policy</Link>
          <Link href="">FAQ</Link>
        </div>
        <div className="sns">
          <LinkComponent
            url="https://www.facebook.com"
            iconSrc={facebookIcon}
            altText="기타 링크"
          />
          <LinkComponent
            url="https://x.com/?lang=ko"
            iconSrc={twitterIcon}
            altText="트위터 이동"
          />
          <LinkComponent
            url="https://www.youtube.com"
            iconSrc={youtubeIcon}
            altText="유튜브 이동"
          />
          <LinkComponent
            url="https://www.instagram.com"
            iconSrc={instagramIcon}
            altText="인스타그램 이동"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
