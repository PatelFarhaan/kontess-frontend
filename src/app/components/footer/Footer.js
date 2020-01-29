import React from "react";

import fb_icon from "../../../assets/icons/facebook.svg";
import ins_icon from "../../../assets/icons/instagram.svg";
import twitter_icon from "../../../assets/icons/twitter.svg";
import linkedin_icon from "../../../assets/icons/linkedin.svg";

import "./style.scss";

const Footer = () => (
  <footer id="landing-footer">
    <div id="social-media-links">
      <span>
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={fb_icon} alt="Facebook Page"></img>
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={ins_icon} alt="Instagram Page"></img>
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <img src={twitter_icon} alt="Twitter Page"></img>
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={linkedin_icon} alt="LinkedIn Page"></img>
        </a>
      </span>
    </div>

    <div className="others">
      <div className="copyright">{`© ${new Date().getFullYear()} Kontess`}</div>
      <div className="icon-credit">
        Icons made by{" "}
        <a href="https://www.flaticon.com/authors/freepik" title="Freepik">
          Freepik
        </a>{" "}
        from{" "}
        <a href="https://www.flaticon.com/" title="Flaticon">
          www.flaticon.com
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
