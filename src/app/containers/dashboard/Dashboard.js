import React from "react";

import DashboardTemplate from "../../components/dashboard-template/DashBoardTemplate";
import DashboardWidget from "../../components/dashboard/DashboardWidget";

import * as session from "../../../utils/session";

export default class Dashboard extends React.Component {
  componentDidMount() {
    console.log(session.getUserType());
  }

  render() {
    return (
      <DashboardTemplate title="Dashboard" pageId="home">
        <div className="container">
          <div>
            <DashboardWidget title="Participants">
              <div class="container">graphs</div>
            </DashboardWidget>
            <DashboardWidget title="Teams">
              <div class="container">graphs</div>
            </DashboardWidget>
          </div>
          <div>
            <DashboardWidget title="Events">
              <div class="container">graphs</div>
            </DashboardWidget>
            <DashboardWidget title="Conflicts">
              <div class="container">graphs</div>
            </DashboardWidget>
          </div>
        </div>
      </DashboardTemplate>
    );
  }
}
