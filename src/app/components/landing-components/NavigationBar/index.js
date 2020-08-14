import React from "react";
import kontessLogoImg from "assets/images/logo_name_blue.png";

import "./style.scss";

export default function NavigationBar(props) {
  return (
    <div className={"nav-bar"}>
      <button id="home-page-button">
        <img alt="logo" id="logo-image" src={kontessLogoImg}></img>
      </button>
      <ul className={"nav-buttons"}></ul>
      <ul className={"nav-buttons-right"}>
        <li className={"nav-item"}>
          <a href={"/login"} className="nav-button login current-page">
            Login
          </a>
        </li>
        <li className={"nav-item"}>
          <a
            href="mailto:info@kontess.com"
            className="nav-button contact current-page"
          >
            Contact Us
          </a>
        </li>
      </ul>
    </div>
  );
}
