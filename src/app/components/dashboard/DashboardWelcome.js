/*
@copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author     : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained herein is, and remains
the property of ToXSL Technologies Pvt. Ltd. and its partners.
Unauthorized copying of this file, via any medium is strictly prohibited.
*/
import React from "react";
import { Link } from "react-router-dom"
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
                <Link to="/dashboard/listTeams">
                  <button className="join-team">I want to join a team</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
