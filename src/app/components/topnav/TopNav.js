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
      <div className="top-nav">
        <h1 className="title">{this.props.title}</h1>
        <button className="notification" onClick={this.notify}>
          <img src={notificationIcon}></img>
        </button>
        <div className="name">{this.state.name}</div>
      </div>
    );
  }
}
