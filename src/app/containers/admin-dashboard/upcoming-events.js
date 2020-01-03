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
import { patchFetch } from "../../../utils/fetchRequests";
import { commonErrorMsg } from "../../../utils/Message";
import { toast } from 'react-toastify';
import { getFetch } from "../../../utils/fetchRequests";
import Pagination from '../../components/pagination';
import moment from 'moment';
import { Loading } from '../../globals/contants';
import NewEvent from "../Activity/newEvent";

export default class UpcomingEvents extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            perPage: 3,
            count: 0,
        };
    }
    componentWillMount = async () => {
        let self = this;
        setTimeout(function () { self.getAllEvents(); }, 100);
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
        await getFetch(`event?limit=${self.state.perPage}&offset=${offset}`).then((resp) => {
            if (resp.status === 200) {
                self.setState({ eventList: resp.data, count: resp.count });
            }
        }).catch(err => {
        })
    }
    editEvent = (event) => {
        this.setState({ event })
    }
    render() {
        return (
            <div className="col-lg-4">
                <div className="row align-items-center mb-3">
                    <div className="col-md-9"><h6 className="mt-2 mb-0">Upcoming Events</h6></div>
                </div>
                <div className="card">
                    <div className="card-body p-1">
                        <ul className="mt-2">
                            {this.state.eventList ? this.state.eventList.length ? this.state.eventList.map((item, index) =>
                                <li>
                                    <div className="event-wrap mb-2">
                                        <div className="row">
                                            <div className="col-md-2 pr-0 text-center">
                                                <div className="event-date">
                                                    <strong> <Moment format="MMM">{moment(item.schedule_date, 'YYYY-MM-DD HH:mm A')}</Moment>
                                                        <br />  <Moment format="DD">{moment(item.schedule_date, 'YYYY-MM-DD HH:mm A')}</Moment></strong>
                                                </div>
                                            </div>
                                            <div className="col-md-10 border-left">
                                                <div className="event-data">
                                                    <p className="mb-0">{item.title}: {item.description}</p>
                                                    <small>Location: {item.location}</small>
                                                    <a className="btn btn-outline-success btn-sm btn-custom mt-3 ml-5" data-toggle="modal" data-target="#newevent" data-backdrop="static" data-keyboard="false" onClick={() => this.editEvent(item)}>Edit</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ) : <div className="comment-widgets mb-3">
                                    <div className="d-flex flex-row comment-row">
                                        No events found
                      </div>
                                </div> : <Loading />}

                        </ul>
                        <Pagination perPage={this.state.perPage} count={this.state.count} handlePageClick={(ev) => this.handlePagination(ev)} />
                    </div>
                </div>
                <div className="modal fadeIn animated" id="newevent">
                    <NewEvent getAllEvents={this.getAllEvents} event={this.state.event} ></NewEvent>
                </div>
            </div>
        );
    }
}
