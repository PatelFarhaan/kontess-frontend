import React from "react";

import DashboardTemplate from "../../components/dashboard-template/DashBoardTemplate";
import TeamService from "../../services/TeamService";

export default class TeamList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      teams: {}
    };
  }
  componentDidMount() {
    TeamService.list().then(d => {
      const allTeamData = {};
      d.data.forEach(element => {
        const name = element["name"];
        allTeamData[name] = this.parseTeam(element);
      });
      console.log(allTeamData);
      this.setState({ teams: allTeamData });
    });
  }

  parseTeam(team) {
    const teamData = {};
    const description = team["description"];
    const participants = team["participants"];

    teamData["description"] = description;
    teamData["participants"] = participants;
    return teamData;
  }

  render() {
    return (
      <DashboardTemplate title="Dashboard" pageId="teams">
        <div className="container">asdlfkjasldkfjasldkfjasdf</div>
      </DashboardTemplate>
    );
  }
}
