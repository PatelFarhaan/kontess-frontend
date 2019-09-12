import React from "react";
import Modal from "react-modal";

import DashboardTemplate from "../../components/dashboard-template/DashBoardTemplate";
import CreateTeamForm from "../../components/forms/CreateTeamForm";
import TeamRequestForm from "../../components/forms/TeamRequestForm";
import TeamListTable from "../../components/tables/TeamListTable";
import ProfileModal from "../../components/profile-modal/ProfileModal";
import deleteIcon from "assets/icons/delete.svg";

import * as session from "../../../utils/session";

import "./style.scss";

export default class TeamList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      teams: [],
      createModalIsOpen: false,
      teamRequestModalIsOpen: false,
      profileModalIsOpen: false,
      profileUserId: -1,
      joinRequestTeamId: -1,
      nextUrl: "",
      previousUrl: "",
      maxPage: 0,
      page: 0
    };

    this.openCreateModal = this.openCreateModal.bind(this);
    this.closeCreateModal = this.closeCreateModal.bind(this);
    this.openTeamRequestModal = this.openTeamRequestModal.bind(this);
    this.closeTeamRequestModal = this.closeTeamRequestModal.bind(this);
    this.openProfileModal = this.openProfileModal.bind(this);
    this.closeProfileModal = this.closeProfileModal.bind(this);
  }

  // modal functions
  openCreateModal() {
    this.setState({ createModalIsOpen: true });
  }

  closeCreateModal() {
    this.setState({ createModalIsOpen: false });
    window.location.reload();
  }

  openTeamRequestModal(id) {
    this.setState({
      teamRequestModalIsOpen: true,
      joinRequestTeamId: id
    });
  }

  closeTeamRequestModal() {
    this.setState({ teamRequestModalIsOpen: false });
    window.location.reload();
  }

  openProfileModal(id) {
    this.setState({
      profileModalIsOpen: true,
      profileUserId: id
    });
  }

  closeProfileModal() {
    this.setState({
      profileModalIsOpen: false
    });
  }

  render() {
    return (
      <DashboardTemplate title="Dashboard" pageId="listTeams">
        <div className="container">
          <div className="header">
            <button className="create" onClick={this.openCreateModal}>
              Create Team
            </button>
          </div>
          {session.getUserType() == "Organizer" ? (
            <TeamListTable
              openTeamRequestModal={this.openTeamRequestModal}
              openCreateModal={this.openCreateModal}
              openProfileModal={this.openProfileModal}
            />
          ) : session.getUserType() == "Participant" ? (
            <TeamListTable
              openTeamRequestModal={this.openTeamRequestModal}
              openCreateModal={this.openCreateModal}
              openProfileModal={this.openProfileModal}
            />
          ) : (
            <> </>
          )}
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
          <Modal
            isOpen={this.state.teamRequestModalIsOpen}
            onRequestClose={this.closeTeamRequestModal}
            contentLabel="Create Team"
            className="modal requestModal"
            overlayClassName="Overlay"
            shouldCloseOnEsc={false}
          >
            <button
              className="close-button"
              onClick={this.closeTeamRequestModal}
            >
              <img src={deleteIcon} alt="delete" />
            </button>
            <div className="content">
              <div className="title">Request To Join Team</div>
              <TeamRequestForm
                teamId={this.state.joinRequestTeamId}
                callback={this.closeTeamRequestModal}
              />
            </div>
          </Modal>
          {this.state.profileModalIsOpen && (
            <ProfileModal
              role={"Participant"}
              userId={this.state.profileUserId}
              modelIsOpen={this.state.profileModalIsOpen}
              closeModal={this.closeProfileModal}
            />
          )}
        </div>
      </DashboardTemplate>
    );
  }
}
