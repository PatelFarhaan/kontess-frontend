
import React from "react";
import Moment from 'react-moment';
//import { patchFetch } from "../../../utils/fetchRequests";
//import { commonErrorMsg } from "../../../utils/Message";
//import { toast } from 'react-toastify';
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
        self.resetEvent();
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
    resetEvent = () => {
        this.setState({event: null});
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
                                                <div className="event-date mt-3">
                                                    <strong> <Moment format="MMM">{moment(item.schedule_date, 'YYYY-MM-DD hh:mm A')}</Moment>
                                                        <br />  <Moment format="DD">{moment(item.schedule_date, 'YYYY-MM-DD hh:mm A')}</Moment></strong>
                                                </div>
                                            </div>
                                            <div className="col-md-10 border-left mt-3">
                                                <div className="event-data">
                                                    <p className="mb-0">{item.title}: {item.description}</p>
                                                    <small>Location: {item.location}
                                                       <br/> Time: <Moment format="h:mm A">{moment(item.schedule_date, 'YYYY-MM-DD hh:mm A')}</Moment></small>
                                                    <a href="/#" className="btn btn-outline-success btn-sm btn-custom" data-toggle="modal" data-target="#newevent" data-backdrop="static" data-keyboard="false" style={{float:'right'}} onClick={() => this.editEvent(item)}>Edit</a>
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
                    </div>
                </div>
                <Pagination perPage={this.state.perPage} count={this.state.count} handlePageClick={(ev) => this.handlePagination(ev)} />
                <div className="modal fadeIn animated" id="newevent">
                    <NewEvent getAllEvents={this.getAllEvents} resetEvent={this.resetEvent} event={this.state.event} ></NewEvent>
                </div>
            </div>
        );
    }
}
