import React from "react";

import "./style.scss";

export default class DashboardWelcome extends React.Component {
  render() {
    return (
      <div className="dashboard-welcome">
        <div className="container">
          <p className="header">Welcome to Kontess {this.props.name}! </p>
          <p className="question">Start by finding your teammates </p>
          <div className="button-container">
            <div className="button-wrapper">
              <div className="left">
                <button
                  onClick={this.props.openCreateModal}
                  className="create-team"
                >
                  I want to make a team
                </button>
              </div>
              <div className="right">
                <a href="/dashboard/listTeams">
                  <button className="join-team">I want to join a team</button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
