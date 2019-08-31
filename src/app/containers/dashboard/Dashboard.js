import React from "react";

import DashboardTemplate from "../../components/dashboard-template/DashBoardTemplate";
import DashboardWidget from "../../components/dashboard/DashboardWidget";

export default class Dashboard extends React.Component {
  render() {
    return (
      <DashboardTemplate title="Dashboard" pageId="home">
        <div>
          <DashboardWidget title="hi" />
          <DashboardWidget title="hi" />
        </div>
        <div>
          <DashboardWidget title="hi" />
          <DashboardWidget title="hi" />
        </div>
      </DashboardTemplate>
    );
  }
}
