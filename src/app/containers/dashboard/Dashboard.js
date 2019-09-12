import React from "react";

import DashboardTemplate from "../../components/dashboard-template/DashBoardTemplate";
import DashboardWidget from "../../components/dashboard/DashboardWidget";

import * as session from "../../../utils/session";

export default class Dashboard extends React.Component {
  render() {
    return (
      <DashboardTemplate title="Dashboard" pageId="home">
        <div className="container">
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
      </DashboardTemplate>
    );
  }
}
