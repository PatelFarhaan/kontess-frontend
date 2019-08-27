import React from "react";

import SideNav from "../../components/sidenav/SideNav";
import TopNav from "../../components/topnav/TopNav";
import Footer from "../../components/footer/Footer";
import "./style.scss";

export default class DashboardTemplate extends React.Component {
  render() {
    return (
      <div>
        <div className="dashboard">
          <SideNav currentPageId="dashboard-nav" />
          <div className="rightColumn">
            <TopNav />
            {this.props.children}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
