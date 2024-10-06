import React from "react";

function HomeFooter() {
  return (
    <footer className="footer-content">
      <div className="footer-wrapper">
        <div id="copyright">@codeit - 2024</div>
        <div className="footer-links">
          <a href="/pages/privacy.html">Privacy Policy</a>
          <a href="/pages/faq.html">FAQ</a>
        </div>
        <div className="social-links">
          <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
            <img src="images/icons/ic_facebook.svg" alt="Facebook" />
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
            <img src="images/icons/ic_twitter.svg" alt="Twitter" />
          </a>
          <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
            <img src="images/icons/ic_youtube.svg" alt="YouTube" />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <img src="images/icons/ic_instagram.svg" alt="Instagram" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default HomeFooter;
