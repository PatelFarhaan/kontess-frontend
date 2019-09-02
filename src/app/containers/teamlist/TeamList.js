import React from "react";
import Modal from "react-modal";

import DashboardTemplate from "../../components/dashboard-template/DashBoardTemplate";
import CreateTeamForm from "../../components/forms/CreateTeamForm";
import TeamRequestForm from "../../components/forms/TeamRequestForm";
import TeamService from "../../services/TeamService";
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
      joinRequestTeamId: -1
    };

    this.createOrganizerRows = this.createOrganizerRows.bind(this);
    this.createParticipantRows = this.createParticipantRows.bind(this);
    this.openCreateModal = this.openCreateModal.bind(this);
    this.closeCreateModal = this.closeCreateModal.bind(this);
    this.openTeamRequestModal = this.openTeamRequestModal.bind(this);
    this.closeTeamRequestModal = this.closeTeamRequestModal.bind(this);
  }

  componentDidMount() {
    TeamService.list().then(d => {
      const allTeamData = [];
      d.data.forEach(element => {
        allTeamData.push(this.parseTeam(element));
      });
      this.setState({ teams: allTeamData });
    });
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
    this.setState({ teamRequestModalIsOpen: true, joinRequestTeamId: id });
  }

  closeTeamRequestModal() {
    this.setState({ teamRequestModalIsOpen: false });
    window.location.reload();
  }

  // team data parsing functions
  parseTeam(team) {
    const teamData = {};
    const id = team["id"];
    const name = team["name"];
    const description = team["description"];
    const participants = team["participants"];

    teamData["id"] = id;
    teamData["name"] = name;
    teamData["description"] = description;
    teamData["participants"] = participants;
    return teamData;
  }

  deleteTeam(id) {
    TeamService.delete(id)
      .then(d => {
        window.location.reload();
      })
      .catch(e => {
        console.log(e);
      });
  }

  joinTeam(id) {
    TeamService.joinTeam(id)
      .then(d => {
        window.location.reload();
      })
      .catch(e => {
        console.log(e);
      });
  }

  createOrganizerRows() {
    const rows = this.state.teams.map(team => (
      <tr>
        <td>{team["name"]}</td>
        <td>{team["description"]}</td>
        <td>{team["participants"].size}</td>
        <td>
          <button
            className="delete-button"
            onClick={() => this.deleteTeam(team["id"])}
          >
            <img src={deleteIcon} alt="delete" />
          </button>
        </td>
      </tr>
    ));
    return <> {rows} </>;
  }

  createParticipantRows() {
    const rows = this.state.teams.map(team => (
      <tr>
        <td>{team["name"]}</td>
        <td>{team["description"]}</td>
        <td>{team["participants"].size}</td>
        <td>
          <button
            className="join-button"
            onClick={() => this.openTeamRequestModal(team["id"])}
          >
            Join
          </button>
        </td>
      </tr>
    ));
    return <> {rows} </>;
  }

  render() {
    return (
      <DashboardTemplate title="Dashboard" pageId="teams">
        <div className="container">
          <div className="header">
            <button className="create" onClick={this.openCreateModal}>
              Create Team
            </button>
          </div>
          <table className="table">
            <tr>
              <th width="30%">Name</th>
              <th width="47%">Description</th>
              <th width="20%">Participants</th>
              {session.getUserType() == "organizer" ? (
                <th width="3%"></th>
              ) : (
                <div></div>
              )}
            </tr>
            {session.getUserType() == "organizer" && this.createOrganizerRows()}
            {session.getUserType() == "participant" &&
              this.createParticipantRows()}
          </table>
          <Modal
            isOpen={this.state.createModalIsOpen}
            onRequestClose={this.closeCreateModal}
            contentLabel="Create Team"
            className="modal createModal"
            overlayClassName="Overlay"
            shouldCloseOnEsc={false}
          >
            <button className="closeButton" onClick={this.closeCreateModal}>
              <img src={deleteIcon} alt="delete" />
            </button>
            <div className="content">
              <div className="title">Create Team</div>
              <hr />
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
              className="closeButton"
              onClick={this.closeTeamRequestModal}
            >
              <img src={deleteIcon} alt="delete" />
            </button>
            <div className="content">
              <div className="title">Request To Join Team</div>
              <hr />
              <TeamRequestForm
                teamId={this.state.joinRequestTeamId}
                callback={this.closeTeamRequestModal}
              />
            </div>
          </Modal>
        </div>
      </DashboardTemplate>
    );
  }
}
