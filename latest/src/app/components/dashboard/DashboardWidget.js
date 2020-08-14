
import React from "react";
export default class DashboardWidget extends React.Component {
  render() {
    return (
      <div className="dashboard-widget">
        <div className="header">
          <div className="widget-title">{this.props.title}</div>
        </div>
        <div className="content">{this.props.children}</div>
      </div>
    );
  }
}
