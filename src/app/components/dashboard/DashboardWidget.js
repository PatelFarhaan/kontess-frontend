import React from "react";

import PopUp from "../popup-window/PopUp";
import "./style.scss";

export default class DashboardWidget extends React.Component {
  render() {
    return (
      <div className="dashboard-widget">
        <div className="todo-item-title">
          <h2>{this.props.title}</h2>
        </div>
        <div className="todo-item-content">{this.props.children}</div>
      </div>
    );
  }
}
