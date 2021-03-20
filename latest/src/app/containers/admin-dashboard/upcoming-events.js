
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
import UpcomingEventsList from "./upcoming-event-list";
import * as session from "../../../utils/session";

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
        let userType = await session.getUserType();
        let self = this;
        await getFetch(`event?limit=${self.state.perPage}&offset=${offset}`).then((resp) => {
            if (resp.status === 200) {
                self.setState({ eventList: resp.data, count: resp.count ,userType:userType});
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
            <div className="col-6">
            <div className="card">
            <div className = "card-header" style={{padding:"1rem 0 1rem 1rem"}}>
<h5 className="d-inline-block">Upcoming Events</h5>
<a className="btn btn-default float-right" data-toggle="modal" role="button" data-target='#eventModal' style={{paddingTop:"0px"}}>See more</a>
</div>
<div className="card-body">
    <div className= "card-text">
<div className="card mt-3 mb-3" >
                    <div className="card-body p-1">
                        <ul className="mt-2">
                            {this.state.eventList ? this.state.eventList.length ? this.state.eventList.map((item, index) =>
                                {
                                    return (<li key={index}>
                                    <div className="event-wrap mb-2">
                                        <div className="row m-0">
                                            <div className="col-md-2 pr-0 text-center">
                                                <div className="event-date mt-3">
                                                    <strong> <Moment format="MMM">{moment(item.schedule_date, 'YYYY-MM-DD hh:mm A')}</Moment>
                                                        <br />  <Moment format="DD">{moment(item.schedule_date, 'YYYY-MM-DD hh:mm A')}</Moment></strong>
                                                </div>
                                            </div>
                                            <div className="col-md-8 border-left mt-3">
                                                <div className="event-data">
                                                    <p className="mb-0">{item.title}: {item.description}</p>
                                                    <small>Location: {item.location}
                                                       <br/> Time: <Moment format="h:mm A">{moment(item.schedule_date, 'YYYY-MM-DD hh:mm A')}</Moment></small>
                                                    {/* <NewEvent ModalId={modal_id} getAllEvents={this.getAllEvents} resetEvent={this.resetEvent} event={this.state.event} ></NewEvent> */}
                                                </div>
                                            </div>
                                            <div className = "col-md-2 mt-3 p-0">
                                            {
              this.state.userType === "admin" && item.start_url !== ""
              ? (<a className="btn p-0" href={item.start_url} target="_blank" rel="noopener noreferrer">Start Meeting</a>)
              : this.state.userType !== "admin" && item.join_url !== ""
              ? (<a className="btn p-0" href={item.join_url} target="_blank" rel="noopener noreferrer">Join Meeting </a>)
              : null
            }

                                            </div>
                                        </div>
                                    </div> 
                                </li>)}
                            ) : <div className="comment-widgets mb-3">
                                    <div className="d-flex flex-row comment-row">
                                        No events found
                                    </div>
                                </div> : <Loading />}
                        </ul>
                    </div>
                </div>
                </div>
                <div className="col d-flex justify-content-center">
    <a href="/kontess/dashboard/events" className="btn btn-primary">Create new event</a>                          
                        </div>
                {/* <Pagination perPage={this.state.perPage} count={this.state.count} handlePageClick={(ev) => this.handlePagination(ev)} /> */}
</div>
</div>
            <UpcomingEventsList data={this.state} getAllEvents={this.getAllEvents}/>
            </div>
        );
    }
}
