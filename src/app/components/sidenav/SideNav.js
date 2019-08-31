import React from "react";
import PropTypes from "prop-types";
import "./style.scss";

import kontessLogoImg from "assets/images/logo.png";
import dashboardIcon from "assets/icons/dashboard.svg";
import eventIcon from "assets/icons/activity.svg";
import userIcon from "assets/icons/activity.svg";

const pages = [
  {
    name: "Dashboard",
    iconPath: dashboardIcon,
    pageId: "dashboard"
  },
  {
    name: "Event",
    iconPath: eventIcon,
    pageId: "event"
  },
  {
    name: "Users",
    iconPath: userIcon,
    pageId: "users"
  }
];

export default class SideNav extends React.Component {
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
    return <div>{buttons}</div>;
  }

  switchPage(event, targetPageId) {
    // TODO: implement page switching
    event.preventDefault();
  }

  render() {
    return (
      <div className="sidenav">
        <div className="headerBlock">
          <img className="logo" src={kontessLogoImg} alt="Kontess Logo" />
          <p className="name">{this.props.userName}</p>
        </div>
        <div className="buttonMenu"> {(() => this.getButtons())()}</div>
      </div>
    );
  }
}

SideNav.propTypes = {
  currentPageId: PropTypes.string
};
