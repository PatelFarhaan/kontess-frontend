import React from 'react';

import * as session from "../../../utils/session"
import SideNav from '../../components/sidenav/SideNav';
import TopNav from '../../components/topnav/TopNav';

import './style.scss';

export default class Dashboard extends React.Component {
  render() {
    return (
      <div className="dashboard">
        <SideNav currentPageId="dashboard-nav"/>
        <div>
          <TopNav />
          {this.props.children /* which will be <ToDoBody /> */}
        </div>
      </div>
    );
  }
}
