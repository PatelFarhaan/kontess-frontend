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
              <div>graphs</div>
            </DashboardWidget>
            <DashboardWidget title="Teams">
              <div>graphs</div>
            </DashboardWidget>
          </div>
          <div>
            <DashboardWidget title="Events">
              <div>graphs</div>
            </DashboardWidget>
            <DashboardWidget title="Tasks">
              <div>graphs</div>
            </DashboardWidget>
          </div>
        </div>
      </DashboardTemplate>
    );
  }
}
