import React from "react";
import "./style.scss";

import dropDownMenuIcon from "assets/icons/dropdown.svg";
import notificationIcon from "assets/icons/notification.svg";

import OrganizerDataService from "../../services/OrganizerDataService";
import * as session from "../../../utils/session";

export default class TopNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      title: ""
    };
  }

  componentDidMount() {
    console.log(session.getSession());
    OrganizerDataService.getCurrentUser().then(response => {
      this.setState({
        name:
          response.data.user.first_name + " " + response.data.user.last_name,
        title: response.data.title
      });
    });
  }

  render() {
    return (
      <nav className="topnav">
        <p id="page-title">Dashboard</p>
        <button id="notification-button">
          <span className="icon-text-wrapper">
            <img src={notificationIcon} alt="notification" />
          </span>
        </button>
        <button id="user-name-avatar">
          <span className="icon-text-wrapper">
            <img id="avatar" src={""} alt="" />
            <p>{this.state.name}</p>
            <img className="icon-img" src={dropDownMenuIcon} alt="" />
          </span>
        </button>
      </nav>
    );
  }
}
