import React from "react";
import "./style.scss";

import notificationIcon from "assets/icons/notification.svg";
import ProfileModal from "../profile-modal/ProfileModal";

import OrganizerDataService from "../../services/OrganizerDataService";
import ParticipantDataService from "../../services/ParticipantDataService";
import JudgeDataService from "../../services/JudgeDataService";

import * as session from "../../../utils/session";

export default class TopNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      title: "",
      profileModalIsOpen: false
    };
    this.openProfileModal = this.openProfileModal.bind(this);
    this.closeProfileModal = this.closeProfileModal.bind(this);
  }

  componentDidMount() {
    const userType = session.getUserType();
    let service = OrganizerDataService;
    if (userType == "Participant") {
      service = ParticipantDataService;
    } else if (userType == "Judge") {
      service = JudgeDataService;
    }
    service.getCurrentUser().then(response => {
      this.setState({
        name:
          response.data.user.first_name + " " + response.data.user.last_name,
        title: response.data.title
      });
    });
  }

  openProfileModal() {
    this.setState({
      profileModalIsOpen: true
    });
  }

  closeProfileModal() {
    this.setState({
      profileModalIsOpen: false
    });
  }

  render() {
    return (
      <div className="top-nav">
        <h1 className="title">{this.props.title}</h1>
        <button className="notification" onClick={this.notify}>
          <img src={notificationIcon}></img>
        </button>
        <div className="name-area" onClick={this.openProfileModal}>
          <div className="name">{this.state.name}</div>
        </div>
        <ProfileModal
          role={"Participant"}
          userId={session.getSessionUserId()}
          modelIsOpen={this.state.profileModalIsOpen}
          closeModal={this.closeProfileModal}
        />
      </div>
    );
  }
}
