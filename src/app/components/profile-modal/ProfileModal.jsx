import React from "react";
import Modal from "react-modal";

import profileIcon from "../../../assets/icons/profile.svg";
import deleteIcon from "assets/icons/delete.svg";

import "./style.scss";
import * as serviceHelper from "../../../utils/serviceHelper";
import * as session from "../../../utils/session";

class ProfileEditableModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      teamName: "",
      title: "",
      editableTitle: "",
      editable: false,
      editPermissions: false
    };

    this.formHandler = this.formHandler.bind(this);
    this.changeTitle = this.changeTitle.bind(this);
    this.updateData = this.updateData.bind(this);
  }

  formHandler(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  changeTitle() {
    const service = serviceHelper.getService(this.props.type);
    service.updateTitleProfile(this.state.editableTitle).then(response => {
      this.setState({
        editable: false
      });
      this.updateData();
    });
  }

  componentDidMount() {
    this.updateData();
  }

  updateData() {
    const service = serviceHelper.getService(this.props.type);

    service.getUser(this.props.userId).then(response => {
      this.setState({
        name:
          response.data.user.first_name + " " + response.data.user.last_name,
        email: response.data.user.username,
        title: response.data.title,
        editableTitle: response.data.title
      });
      if (session.getSessionUserId() == this.props.userId) {
        this.setState({
          editPermissions: true
        });
      }
      if (this.props.type == "Participant") {
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
            {this.props.type}
            <button className="close-button" onClick={this.props.closeModal}>
              <img src={deleteIcon} alt="delete" />
            </button>
          </div>
          <div>
            <img className="profile-icon" src={profileIcon} />
          </div>
          <div className="profile-info">
            <div className="header">{this.state.name}</div>
            <div className="subheader">
              {this.state.editable ? (
                <div>
                  <input
                    name="editableTitle"
                    className="edit-field"
                    value={this.state.editableTitle}
                    onChange={this.formHandler}
                  />
                  <button
                    className="edit-button"
                    onClick={() => this.changeTitle()}
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div>
                  <span>{this.state.title}</span>
                  {this.state.editPermissions && (
                    <button
                      className="edit-button"
                      onClick={() => this.setState({ editable: true })}
                    >
                      Edit
                    </button>
                  )}
                </div>
              )}
            </div>
            <div className="info">
              <b>Email:</b> {this.state.email}
            </div>
            {this.props.type == "Participant" && (
              <div className="info">
                <div>
                  <b>Team:</b> {this.state.teamName}
                </div>
              </div>
            )}
          </div>
        </div>
      </Modal>
    );
  }
}
export default ProfileEditableModal;
