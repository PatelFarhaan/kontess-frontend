
import { Link } from "react-router-dom";
import React from 'react';
import { getFetch, postFetch } from '../../../utils/fetchRequests';
import Moment from 'react-moment';
import moment from "moment";
import * as session from '../../../utils/session';


export default class TeamEvents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: '',
      perPage: 100,
      userId: session.getSessionUserId()
    };

  }
  componentWillMount = async () => {
    await this.getTeamEvents();
  };

  getTeamEvents = async () => {
    let self = this;
    await getFetch(`team_event/?team_id=` + this.props.teamId + '&limit=' + this.state.perPage + '&offset=0')
      .then(resp => {
        if (resp.data) {
          self.setState({
            events: resp.data
          });
        }
      })
      .catch(err => { });
  }
  render() {
    const { events, userId } = this.state;
    return (
      <div className="team-event-list py-4">
        <h5> Team Events</h5>
        <ul className="list-unstyled overflow-height">
          {events.length
            ? events.map((event, index) => (
              <li key={event.id}>
                <Link to={'/dashboard/edit-team-event/' + this.props.teamId + '/' + event.id}>
                  <div className={`comment-widgets no-hover p-1 border border-dark mb-0 ${moment() < moment(event.schedule_date, 'YYYY-MM-DD hh:mm A') ? 'bg-d7' : 'bg-white'}`}>
                    <div className="d-flex flex-row comment-row border-0">
                      <div className="tesk-detail w-100 border-0 ml-0 pl-0">
                        <h5 className="text-muted mb-0 event-name">
                          {event.title}
                        </h5>
                        <span className="event-location">
                          <Moment format="llll">{moment(event.schedule_date, 'YYYY-MM-DD hh:mm A')}</Moment>, {event.location}
                        </span>
                        <h6 className="text-muted mb-0 event-name">
                          Created By : {event.created_by.id === userId ? 'Me' : event.created_by.full_name}
                        </h6>
                      </div>
                    </div>
                  </div>
                </Link>


              </li>
            ))
            : <h4 className="text-center padding100">No team events yet</h4>}
        </ul>
        {/* <div className="my-3">
          <Link to={'/dashboard/create-team-event/' + this.props.teamId} className="btn btn-lg btn-primary px-4 rounded-0 btn-block w-75 m-auto">
            Create Event
          </Link>
        </div> */}
      </div>
    );
  }
}
