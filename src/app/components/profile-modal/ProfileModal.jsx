import React from "react";
import Modal from "react-modal";

import ParticipantDataService from "../../services/ParticipantDataService";
import JudgeDataService from "../../services/JudgeDataService";
import OrganizerDataService from "../../services/OrganizerDataService";
import profileIcon from "../../../assets/icons/profile.svg";
import deleteIcon from "assets/icons/delete.svg";

import "./style.scss";
import * as session from "../../../utils/session";

class ProfileModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      teamName: ""
    };
  }

  componentDidMount() {
    let service = JudgeDataService;
    if (this.props.role == "Participant") {
      service = ParticipantDataService;
    } else if (this.props.role == "Organizer") {
      service = OrganizerDataService;
    }
    service.getUser(this.props.userId).then(response => {
      this.setState({
        name:
          response.data.user.first_name + " " + response.data.user.last_name,
        email: response.data.user.username,
        title: response.data.title
      });
      if (this.props.role == "Participant") {
        this.setState({
          teamName: response.data.team.name
        });
      }
    });
  }

  render() {
    return (
      <Modal
        isOpen={this.props.modelIsOpen}
        onRequestClose={this.props.closeModal}
        contentLabel="Create Team"
        className="modal profileModal"
        overlayClassName="Overlay"
        shouldCloseOnEsc={false}
      >
        <div className="modal-content">
          <div className="role-field">
            {this.props.role}
            <button className="close-button" onClick={this.props.closeModal}>
              <img src={deleteIcon} alt="delete" />
            </button>
          </div>
          <div>
            <img className="profile-icon" src={profileIcon} />
          </div>
          <div className="profile-info">
            <div className="header">{this.state.name}</div>
            <div className="info">
              <b>Email:</b> {this.state.email}
            </div>
            <div className="info">
              {this.props.role == "Participant" ? (
                <div>
                  <b>Team:</b> {this.state.teamName}
                </div>
              ) : (
                <div>
                  <b>Title:</b> {this.state.title}
                </div>
              )}
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}
export default ProfileModal;
