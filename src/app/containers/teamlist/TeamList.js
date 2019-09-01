import React from "react";
import Modal from "react-modal";

import DashboardTemplate from "../../components/dashboard-template/DashBoardTemplate";
import CreateTeamForm from "../../components/forms/CreateTeamForm";
import TeamService from "../../services/TeamService";
import deleteIcon from "assets/icons/delete.svg";

import * as session from "../../../utils/session";
import "./style.scss";

export default class TeamList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      teams: [],
      modalIsOpen: false
    };
    this.createTeamRows = this.createTeamRows.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
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
  openModal() {
    this.setState({ modalIsOpen: true });
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
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

  createTeamRows() {
    const rows = this.state.teams.map(team => (
      <tr>
        <td>{team["name"]}</td>
        <td>{team["description"]}</td>
        <td>{team["participants"].size}</td>
        {session.getUserType() == "organizer" ? (
          <td>
            <button
              className="delete-button"
              onClick={() => this.deleteTeam(team["id"])}
            >
              <img src={deleteIcon} alt="delete" />
            </button>
          </td>
        ) : (
          <div></div>
        )}
      </tr>
    ));
    return <> {rows} </>;
  }

  render() {
    return (
      <DashboardTemplate title="Dashboard" pageId="teams">
        <div className="container">
          <div className="header">
            <button className="create" onClick={this.openModal}>
              Create Team
            </button>
            <Modal
              isOpen={this.state.modalIsOpen}
              onRequestClose={this.closeModal}
              contentLabel="Create Team"
              className="createModal"
              overlayClassName="Overlay"
            >
              <button className="closeButton" onClick={this.closeModal}>
                <img src={deleteIcon} alt="delete" />
              </button>
              <div className="content">
                <div className="title">Create Team</div>
                <hr />
                <CreateTeamForm callback={this.closeModal} />
              </div>
            </Modal>
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
            {this.createTeamRows()}
          </table>
        </div>
      </DashboardTemplate>
    );
  }
}
