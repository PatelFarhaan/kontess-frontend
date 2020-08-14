
import React from "react";
import Calendar from 'react-calendar';
import DashboardTemplate from "../../components/dashboard-template/DashBoardTemplate";
import AnnouncementCard from './Card';
import ToDoList from './to-do-list'

import EventCalender from '../Activity/eventCalender';
import Moment from 'react-moment';
import * as session from '../../../utils/session';

export default class UserDashBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myTasks: [],
      perPage: 5,
      count: 0,
      userType: session.getUserType()
    };
  }
  render() {
    return (
      <DashboardTemplate title="DashBoard" pageId="home">
        <div className="dashboard-grid">
          <section className="dasboard-mid mt-2">
            <div className="row">
              <div className="col-lg-6 stretched_card mt-4">
                <AnnouncementCard title='Announcements'></AnnouncementCard>
                {this.state.userType === 'participant' ? <ToDoList title='To-Do List By Teams' type="byTeam"></ToDoList> : ''}
                <ToDoList title='To-Do List By Admin' type="byAdmin"></ToDoList>
              </div>
              <div className="offset-lg-1 col-lg-3 stretched_card mt-4">
                <div className="calendar-view">
                  <h5 className=" mb-4 text-muted">Events</h5>
                  <h4 className="mb-4 text-muted"><Moment format="LL">{new Date()}</Moment></h4>
                  <EventCalender />
                </div>
              </div>
            </div>
          </section>
        </div>
      </DashboardTemplate >
    );
  }
}
