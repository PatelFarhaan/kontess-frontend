/*
@copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author     : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained herein is, and remains
the property of ToXSL Technologies Pvt. Ltd. and its partners.
Unauthorized copying of this file, via any medium is strictly prohibited.
*/
import React from "react";
import DashboardTemplate from "../../components/dashboard-template/DashBoardTemplate";
import Card from "./Card";
import NewEvent from "./newEvent";
import { commonErrorMsg, noResultFoundMsg } from "../../../utils/Message";
import { toast } from 'react-toastify';
import { getFetch } from "../../../utils/fetchRequests";
import Pagination from '../../components/pagination';
import * as session from "../../../utils/session";
import Moment from 'react-moment';
import EventCalender from './eventCalender';

export default class Activity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      perPage: 10,
      count: 0,
      eventList: [],
      date: new Date(),
      modalIsOpen: false,
      event: '',
      Create_date: ''
    };
  }

  componentWillMount = async () => {
    // Display all participants
    await this.getAllEvents();
    let UserType = await session.getUserType();
    this.setState({
      UserType: UserType
    })
  }

  // handle pagination
  handlePagination = (data) => {
    let self = this;
    let selected = data.selected;
    let offset = Math.ceil(selected * self.state.perPage);
    self.getAllEvents(offset);
  }

  getAllEvents = async (offset = 0) => {
    let self = this;
    self.setState({
      loading: true,
      eventList: []
    })
    await getFetch(`event?limit=${self.state.perPage}&offset=${offset}`).then((resp) => {
      self.setState({
        loading: false
      })
      if (resp.status === 200) {
        self.setState({ eventList: resp.data, count: resp.count });
      } else {
        toast.error(commonErrorMsg);
      }
    }).catch(err => {
      self.setState({
        loading: false
      })
      toast.error(err);
    })
  }

  // Change calender date
  onChange = date => this.setState({ date });

  //open create task pop up
  openNewTaskPopUp = () => {
    this.setState({ modalIsOpen: true });
  }

  editEvent = (event) => {
    this.setState({ event })
  }
  createEvent = (Create_date) => {
    this.setState({ Create_date })
  }
  render() {
    return (
      <DashboardTemplate title="Events" pageId="events">
        <div className="dashboard-grid">
          <section className="dasboard-mid mt-2">
            <div className="row">
              <div className="col-lg-7 stretched_card mt-4">
                <div className="card">
                  <div className="card-header d-flex align-items-center">
                    <div className="col-md-8 pull-left">
                      <h4 className="mb-0 text-muted">Upcoming Events</h4>
                    </div>
                    {(session.getUserType() === "admin") ? <div className="col-md-4 pull-right">
                      <button onClick={() => this.editEvent('')} className="btn btn-md btn-primary btn-block w-100" id="close-new-event" data-toggle="modal" data-target="#newevent" data-backdrop="static" data-keyboard="false">New Event</button>
                    </div> : ""}
                  </div>
                  {this.state.eventList.length ? this.state.eventList.map((item, index) =>
                    <div data-toggle="modal" data-target="#newevent" data-backdrop="static" data-keyboard="false" onClick={() => this.editEvent(item)}>
                      <Card data={item} key={index}></Card>
                    </div>
                  ) : <div className="comment-widgets mb-3">
                      <div className="d-flex flex-row comment-row">
                        {noResultFoundMsg}
                      </div>
                    </div>}
                  <Pagination perPage={this.state.perPage} count={this.state.count} handlePageClick={(ev) => this.handlePagination(ev)} />
                </div>
              </div>
              <div className="offset-lg-1 col-lg-3 stretched_card mt-4">
                <div className="calendar-view">
                  <h4 className="mb-4 text-muted"><Moment format="LL">{new Date()}</Moment></h4>
                  <EventCalender createEvent={this.createEvent} />
                </div>
              </div>
            </div>
          </section>
        </div>
        {this.state.UserType === 'admin' ? <div className="modal fade" id="newevent">
          <NewEvent getAllEvents={this.getAllEvents} event={this.state.event} Create_date={this.state.Create_date}></NewEvent>
        </div> : ''}

      </DashboardTemplate>
    );
  }
}
