import React from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import kontessLogoImg from "assets/images/logo.png";
import dashboardIcon from "assets/icons/dashboard.svg";
import eventIcon from "assets/icons/activity.svg";
import userIcon from "assets/icons/activity.svg";
import "./style.scss";

import * as session from "../../../utils/session";

const pages = [
  {
    name: "Dashboard",
    iconPath: dashboardIcon,
    pageId: "home"
  },
  {
    name: "Teams",
    iconPath: eventIcon,
    pageId: "teams"
  },
  {
    name: "Users",
    iconPath: userIcon,
    pageId: "users"
  },
  {
    name: "Chat",
    iconPath: userIcon,
    pageId: "chat"
  }
];

class SideNav extends React.Component {
  constructor(props) {
    super(props);
  }

  getButtons() {
    const buttons = pages.map(page => (
      <button
        className={
          "nav-button" +
          (page.pageId == this.props.currentPageId
            ? " sidenav-button-active"
            : "")
        }
        id={page.pageId}
        onClick={event => {
          this.switchPage(event, page.pageId);
        }}
      >
        <span className="icon-text-wrapper">
          <img className="icon-img" src={page.iconPath} alt="" />
          <p>{page.name}</p>
        </span>
      </button>
    ));
    return <div> {buttons} </div>;
  }

  switchPage(event, targetPageId) {
    // TODO: implement page switching
    this.props.history.push("/dashboard/" + targetPageId);
    event.preventDefault();
  }

  render() {
    return (
      <div className="sidenav">
        <div className="headerBlock">
          <img className="logo" src={kontessLogoImg} alt="Kontess Logo" />
          <p className="name">{this.props.userName}</p>
        </div>
        <div className="buttonMenu">
          {(() => this.getButtons())()}{" "}
          <button
            className={"nav-button"}
            onClick={event => {
              session.clearSession();
              this.props.history.push("/");
            }}
          >
            <span className="icon-text-wrapper">
              <img className="icon-img" src={dashboardIcon} alt="" />
              <p>LogOut</p>
            </span>
          </button>
        </div>
      </div>
    );
  }
}

SideNav.propTypes = {
  currentPageId: PropTypes.string
};

export default withRouter(SideNav);
