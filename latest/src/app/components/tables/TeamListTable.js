
import React from "react";
import TeamService from "../../services/TeamService";
import ParticipantDataService from "../../services/ParticipantDataService";
import previousButton from "assets/images/pagePrevious.png";
import nextButton from "assets/images/pageNext.png";
import profileIcon from "assets/icons/profile.svg";
import deleteIcon from "assets/icons/delete.svg";

import * as routes from "../../globals/endpoints";
import * as session from "../../../utils/session";
import * as api from "../../../utils/requests";

import "./styles.scss";

export default class TeamListTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      teams: [],
      nextUrl: "",
      previousUrl: "",
      maxPage: 0,
      page: 0,
      participantTeam: false
    };

    this.getTeamList = this.getTeamList.bind(this);
    this.setPage = this.setPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
  }

  componentDidMount() {
    this.getTeamList(this.state.page);
    if (session.getUserType() === "Participant") {
      ParticipantDataService.getCurrentUser().then(response => {
        if (response.data.team.id) {
          this.setState({
            participantTeam: true
          });
        }
      });
    }
  }

  setPage(page) {
    this.setState({ page: page });
    this.getTeamList(page * 10);
  }

  nextPage() {
    if (this.state.page + 1 < this.state.maxPage) {
      this.setPage(this.state.page + 1);
    }
  }

  previousPage() {
    if (this.state.page > 0) {
      this.setPage(this.state.page - 1);
    }
  }

  getTeamList(offset) {
    return api
      .getRoute(routes.teamRoute + "?limit=10&offset=" + offset)
      .then(d => {
        const allTeamData = [];
        d.data.results.forEach(element => {
          allTeamData.push(this.parseTeam(element));
        });
        this.setState({
          teams: allTeamData,
          nextUrl: d.data.next,
          previousUrl: d.data.previous,
          maxPage: Math.ceil(d.data.count / 10)
        });
      });
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
      });
  }

  createPageNumbers() {
    let index = this.state.page;
    if (index === 0) {
      index = 1;
    }
    let rows = [];
    for (var i = -1; i < 2; i++) {
      const pageNum = index + i;
      if (pageNum >= 0 && pageNum < this.state.maxPage) {
        rows.push(
          <button className="pageButton" onClick={() => this.setPage(pageNum)}>
            {pageNum + 1}
          </button>
        );
      }
    }

    return <span className="pageNum"> {rows} </span>;
  }

  createOrganizerRows() {
    const rows = this.state.teams.map(team => (
      <tr>
        <td>{team["name"]}</td>
        <td>{team["description"]}</td>
        <td>{team["participants"].length}</td>
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
        <td>
          {team["participants"].map(participant => (
            <div>
              <button
                className="profile-button"
                onClick={() => this.props.openProfileModal(participant.id)}
              >
                <img src={profileIcon} alt="delete" />
              </button>
            </div>
          ))}
        </td>
        <td>
          {!this.state.participantTeam && (
            <button
              className="join-button"
              onClick={() => this.props.openTeamRequestModal(team["id"])}
            >
              Join
            </button>
          )}
        </td>
      </tr>
    ));
    return <> {rows} </>;
  }

  render() {
    return (
      <div>
        <table className="table">
          <tr>
            <th width="30%">Name</th>
            <th width="47%">Description</th>
            <th width="20%">Participants</th>
            <th width="3%"></th>
          </tr>
          {session.getUserType() === "Organizer" ? (
            this.createOrganizerRows()
          ) : session.getUserType() === "Participant" ? (
            this.createParticipantRows()
          ) : (
            <></>
          )}
        </table>
        <div className="button-container">
          <button className="pageButton" onClick={this.previousPage}>
            <img alt="previous" src={previousButton} />
          </button>
          {this.createPageNumbers()}
          <button className="pageButton" onClick={this.nextPage}>
            <img alt="next" src={nextButton} />
          </button>
        </div>
      </div>
    );
  }
}
