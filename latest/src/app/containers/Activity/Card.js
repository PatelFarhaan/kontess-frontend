import React from "react";
import Moment from "react-moment";
import moment from "moment";
import { Urlify } from "../../globals/contants";

export default class Card extends React.Component {
  constructor(props) {
    super(props);
    let date = moment(this.props.data.schedule_date, "YYYY-MM-DD hh:mm A");
    this.state = {
      date: date,
    };
  }

  render() {
    return (
      <div className="comment-widgets mb-3">
        <div className="d-flex flex-row comment-row">
          <div className="event-date mb-0 text-center p-2">
            <h4>
              <Moment format="MMM">{this.state.date}</Moment>
              <br /> <Moment format="DD">{this.state.date}</Moment>
            </h4>
          </div>
          <div className="comment-text w-100">
            <h4 className="text-muted">{this.props.data.title}</h4>
            <small className="m-b-5 text-muted">
              {" "}
              <Moment format="llll">{this.state.date}</Moment>
            </small>
            <br />
            <small className="text-muted">
              Location: {this.props.data.location}
            </small>
            <br />
            <small className="text-muted">
              Join URL for Zoom: {this.props.data.join_url}
            </small>
            <br />
            <small className="text-muted">
              Start URL for Zoom: {this.props.data.start_url}
            </small>
            <br />
            {/* <small className="text-muted">
              Description:{" "}
              <span
                dangerouslySetInnerHTML={{
                  __html: Urlify(this.props.data.description),
                }}
              ></span>
            </small> */}
          </div>
        </div>
      </div>
    );
  }
}
