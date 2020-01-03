/*
@copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author     : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained herein is, and remains
the property of ToXSL Technologies Pvt. Ltd. and its partners.
Unauthorized copying of this file, via any medium is strictly prohibited.
*/
import React from "react";
import Moment from 'react-moment';
import moment from 'moment';

export default class Card extends React.Component {
  constructor(props) {
    super(props);
    let date = moment(this.props.data.schedule_date, 'YYYY-MM-DD HH:mm A');
    this.state = {
      date: date
    };

  }

  render() {
    return (
      <div className="comment-widgets mb-3" >
        <div className="d-flex flex-row comment-row">
          <div className="event-date mb-0 text-center p-2">
            <h4>
              <Moment format="MMM">{this.state.date}</Moment>
              <br />  <Moment format="DD">{this.state.date}</Moment></h4></div>
          <div className="comment-text w-100">
            <h4 className="text-muted">{this.props.data.title}</h4>
            <small className="m-b-5 text-muted"> <Moment format="llll">{this.state.date}</Moment></small><br />
            <small className="text-muted">Location: {this.props.data.location}</small>
          </div>
        </div>
      </div>
    );
  }
}
