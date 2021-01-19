
import React from "react";
import TeamService from "../../services/TeamService";
import previousButton from "../../../assets/images/pagePrevious.png";
import nextButton from "../../../assets/images/pageNext.png";

import * as routes from "../../globals/endpoints";
import * as api from "../../../utils/requests";

import "./styles.scss";

export default class ParticipantListTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      participants: [],
      nextUrl: "",
      previousUrl: "",
      maxPage: 0,
      page: 0
    };

    this.getUserList = this.getUserList.bind(this);
    this.setPage = this.setPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
  }

  componentDidMount() {
    this.getUserList(this.state.page);
  }

  setPage(page) {
    this.setState({ page: page });
    this.getUserList(page * 10);
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

  getUserList(offset) {
    return api
      .getRoute(routes.participantRoute + "?limit=10&offset=" + offset)
      .then(d => {
        const allParticipantData = [];
        d.data.results.forEach(element => {
          allParticipantData.push(this.parseParticipant(element));
        });
        this.setState({
          participants: allParticipantData,
          nextUrl: d.data.next,
          previousUrl: d.data.previous,
          maxPage: Math.ceil(d.data.count / 10)
        });
      });
  }

  // team data parsing functions
  parseParticipant(participant) {
    const participantData = {};
    const id = participant["user"]["id"];
    const participantId = participant["id"];
    const name =
      participant["user"]["first_name"] +
      " " +
      participant["user"]["last_name"];
    const email = participant["user"]["username"];
    const title = participant["title"];

    participantData["id"] = id;
    participantData["participantId"] = participantId;
    participantData["name"] = name;
    participantData["email"] = email;
    participantData["title"] = title;

    if (participant["team"] !== {}) {
      participantData["teamName"] = participant["team"]["name"];
      participantData["teamId"] = participant["team"]["id"];
    } else {
      participantData["teamName"] = "";
    }
    return participantData;
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

  createRows() {
    const rows = this.state.participants.map((participant, index) => (
      <tr
        key={index}
        onClick={() =>
          this.props.openProfileModal(participant["participantId"])
        }
      >
        <td>{participant["name"]}</td>
        <td>{participant["title"]}</td>
        <td>{participant["email"]}</td>
        <td>{participant["teamName"]}</td>
      </tr>
    ));
    return <> {rows} </>;
  }

  render() {
    return (
      <div>
        <table className="table">
          <tr>
            <th width="20%">Name</th>
            <th width="30%">Description</th>
            <th width="30%">Email</th>
            <th width="20%">Team</th>
          </tr>
          {this.createRows()}
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
