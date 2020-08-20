import React from "react";
import SideNav from "../sidenav/SideNav";
import TopNav from "../topnav/TopNav";

export default class DashboardTemplate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPageId: props.currentPageId,
      msgCount: 0,
    };
  }
  setMsgCount = (count) => {
    this.setState({
      msgCount: count,
    });
  };
  render() {
    return (
      <div className="page-container">
        <SideNav
          setMsgCount={this.setMsgCount}
          currentPageId={this.props.pageId}
          userName={this.props.user}
        />
        <div className="main-content">
          <TopNav title={this.props.title} msgCount={this.state.msgCount} />
          <div className="main-content-inner" id="mainContainer">
            <div className="ui segment">
              {this.props.loading ? (
                <div className="ui active transition visible inverted dimmer">
                  <div className="content">
                    <div className="ui inverted text loader">Loading...</div>
                  </div>
                </div>
              ) : (
                ""
              )}
              <div className="">{this.props.children}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
