/*
@copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author     : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained herein is, and remains
the property of ToXSL Technologies Pvt. Ltd. and its partners.
Unauthorized copying of this file, via any medium is strictly prohibited.
*/
import React from "react";
import Modal from "react-modal";
import DashboardTemplate from "../../components/dashboard-template/DashBoardTemplate";
import DashboardWidget from "../../components/dashboard/DashboardWidget";
import DashboardWelcome from "../../components/dashboard/DashboardWelcome";
import CreateTeamForm from "../../components/forms/CreateTeamForm";
import deleteIcon from "assets/icons/delete.svg";
import * as session from "../../../utils/session";

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      participantTeamID: -1,
      createModalIsOpen: false
    };

    this.openCreateModal = this.openCreateModal.bind(this);
    this.closeCreateModal = this.closeCreateModal.bind(this);
  }

  openCreateModal() {
    this.setState({ createModalIsOpen: true });
  }

  closeCreateModal() {
    this.setState({ createModalIsOpen: false });
    window.location.reload();
  }

  componentDidMount() {
  }

  render() {
    return (
      <DashboardTemplate title="Dashboard" pageId="home">
        <div className="container">
          {session.getUserType() === "Organizer" && (
            <div>
              <div>
                <DashboardWidget title="Participants">
                  <div></div>
                </DashboardWidget>
                <DashboardWidget title="Teams">
                  <div></div>
                </DashboardWidget>
              </div>
              <div>
                <DashboardWidget title="Events">
                  <div></div>
                </DashboardWidget>
                <DashboardWidget title="Tasks">
                  <div></div>
                </DashboardWidget>
              </div>
            </div>
          )}
          {session.getUserType() === "Participant" ? (
            this.state.participantTeamID !== -1 ? (
              <div>team info</div>
            ) : (
                <DashboardWelcome
                  openCreateModal={this.openCreateModal}
                  closeCreateModal={this.closeCreateModal}
                />
              )
          ) : (
              <div> some admin stuff</div>
            )}
        </div>
        <Modal
          isOpen={this.state.createModalIsOpen}
          onRequestClose={this.closeCreateModal}
          contentLabel="Create Team"
          className="modal createModal"
          overlayClassName="Overlay"
          shouldCloseOnEsc={false}
        >
          <button className="close-button" onClick={this.closeCreateModal}>
            <img src={deleteIcon} alt="delete" />
          </button>
          <div className="content">
            <div className="title">Create Team</div>
            <CreateTeamForm callback={this.closeCreateModal} />
          </div>
        </Modal>
      </DashboardTemplate>
    );
  }
}
