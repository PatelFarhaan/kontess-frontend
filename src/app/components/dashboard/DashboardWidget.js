/*
@copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author     : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained herein is, and remains
the property of ToXSL Technologies Pvt. Ltd. and its partners.
Unauthorized copying of this file, via any medium is strictly prohibited.
*/
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
