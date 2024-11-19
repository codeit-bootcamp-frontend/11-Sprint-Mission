import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import facebookImg from "../../assets/image/gnb/ic_facebook.png";
import xImg from "../../assets/image/gnb/Vector.png";
import youtubeImg from "../../assets/image/gnb/ic_youtube.png";
import instagramImg from "../../assets/image/gnb/ic_instagram.png";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-box">
        <p className="company">@codeit - 2024</p>
        <div className="info">
          <Link to="/privacy" className="link-deco">
            <p className="info-link">Privacy Policy</p>
          </Link>
          <Link to="/faq" className="link-deco">
            <p className="info-link">FAQ</p>
          </Link>
        </div>
        <div className="footer-image-box">
          <a
            href="https://www.facebook.com/?locale=ko_KR"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-image-link"
          >
            <img src={facebookImg} alt="facebook" />
          </a>
          <a
            href="https://x.com/?lang=ko"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-image-link"
          >
            <img src={xImg} alt="twitter" />
          </a>
          <a
            href="https://www.youtube.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-image-link"
          >
            <img src={youtubeImg} alt="youtube" />
          </a>
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-image-link"
          >
            <img src={instagramImg} alt="instagram" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
