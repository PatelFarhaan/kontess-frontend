
import React from "react";
//import Calendar from 'react-calendar';
import DashboardTemplate from "../../components/dashboard-template/DashBoardTemplate";
import AnnouncementCard from './Card';
import ToDoList from './to-do-list'
import EventCalender from '../Activity/eventCalender';
import Moment from 'react-moment';
import * as session from '../../../utils/session';
import Card from "../Activity/Card";
import Pagination from "../../components/pagination";
import { commonErrorMsg, noResultFoundMsg } from "../../../utils/Message";
import { toast } from "react-toastify";
import { getFetch } from "../../../utils/fetchRequests";


export default class UserDashBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myTasks: [],
      loading: false,
      eventList: [],
      perPage: 5,
      count: 0,
      userType: session.getUserType()
    };
  }
  componentWillMount = async () => {
    await this.getAllEvents();
  };

  // handle pagination
  handlePagination = (data) => {
    let self = this;
    let selected = data.selected;
    let offset = Math.ceil(selected * self.state.perPage);
    self.getAllEvents(offset);
  };

  getAllEvents = async (offset = 0) => {
    let self = this;
    self.setState({
      loading: true,
      eventList: [],
    });
    await getFetch(`event?limit=${self.state.perPage}&offset=${offset}`)
      .then((resp) => {
        self.setState({
          loading: false,
        });
        if (resp.status === 200) {
          console.log(resp.data);
          self.setState({ eventList: resp.data, count: resp.count });
        } else {
          toast.error(commonErrorMsg);
        }
      })
      .catch((err) => {
        self.setState({
          loading: false,
        });
        toast.error(err);
      });
  };

  render() {
    return (
      <DashboardTemplate title="DashBoard" pageId="home">
        <div className="dashboard-grid">
          <section className="dasboard-mid mt-2">
            <div className="row">
              <div className="col-lg-6 stretched_card mt-4">
                <ToDoList title='To-Do List By Admin' type="byAdmin"></ToDoList>
                {this.state.userType === 'participant' ? <ToDoList title='To-Do List By Teams' type="byTeam"></ToDoList> : ''}
                <AnnouncementCard title='Announcements'></AnnouncementCard>
              </div>
              <div className="offset-lg-1 col-lg-3 stretched_card mt-4">
                <div className="calendar-view">
                  {/*<h5 className=" mb-4 text-muted">Events</h5>*/}
                  <div className="card mb-5" style={{minWidth: "500px"}}>
                    <div className="card-header d-flex align-items-center">
                      <div className="col-md-8 pull-left">
                        <h4 className="mb-0 text-muted">Upcoming Events</h4>
                      </div>
                    </div>
                    {this.state.eventList.length ? (
                      this.state.eventList.map((item, index) => (
                        <div
                          data-toggle="modal"
                          data-target="#newevent"
                          data-backdrop="static"
                          data-keyboard="false"
                          //onClick={() => this.editEvent(item)}
                        >
                          <Card data={item} key={index} userType={session.getUserType()}></Card>
                        </div>
                      ))
                    ) : (
                      <div className="comment-widgets mb-3">
                        <div className="d-flex flex-row comment-row">
                          {noResultFoundMsg}
                        </div>
                      </div>
                    )}
                    <Pagination
                      perPage={this.state.perPage}
                      count={this.state.count}
                      handlePageClick={(ev) => this.handlePagination(ev)}
                    />
                </div>
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
