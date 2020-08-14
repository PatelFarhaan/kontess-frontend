import React from "react";
import "./style.scss";
import Footer from "../../components/footer/Footer";

import SideNav from "../sidenav/SideNav";
import TopNav from "../topnav/TopNav";

export default class DashboardTemplate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPageId: props.currentPageId
    };
  }

  render() {
    return (
      <div className="dashboard">
        <TopNav title={this.props.title} />
        <div className="content">
          <div className="main-content">{this.props.children}</div>
          <Footer />
        </div>
        <SideNav currentPageId={this.props.pageId} userName={this.props.user} />
      </div>
    );
  }
}
