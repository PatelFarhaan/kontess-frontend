
import React from "react";
import Moment from 'react-moment';
import { postFetch, postDelete } from "../../../utils/fetchRequests";
import { commonErrorMsg,deleteEventkMsg } from "../../../utils/Message";
import { toast } from 'react-toastify';
import { confirmAlert } from "react-confirm-alert";
import { getFetch } from "../../../utils/fetchRequests";
import Pagination from '../../components/pagination';
import moment from 'moment';
import { Loading } from '../../globals/contants';
import NewEvent from "../Activity/newEvent";

export default class UpcomingEventsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            perPage: 3,
            count: 0,
        };
    }

    componentWillReceiveProps(nextProps,prevProps) {
        if (nextProps != prevProps) {
             const {data} = nextProps;
            this.setState({... data});
        }
      }
    // componentWillMount = async () => {
    //     let self = this;
    //     setTimeout(function () { self.getAllEvents(); }, 100);
    // }

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
        
        let data = event;
        this.setState(data);
    }
    resetEvent = () => {
        this.setState({event: null});
    }
    deleteEvent = (item) => {
        confirmAlert({
          title: "Confirm",
          message: deleteEventkMsg,
          buttons: [
            {
              label: "Yes",
              onClick: () => this.confirmDelete(item),
            },
            {
              label: "No",
            },
          ],
        });
      };
      confirmDelete = async (item) => {
        let self = this;
        await postDelete(`event/` + item.id + `/`)
          .then((resp) => {
            if (resp.msg) {
              toast.success(resp.msg);
            //   self.closeModal();
            //  self.resetState();
              self.props.getAllEvents();
              self.resetEvent();
            } else {
              toast.error(commonErrorMsg);
            }
          })
          .catch((err) => {});
      };
    render() {

        return (
            <div>
                <div className='modal fade' id='eventModal'>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Events</h5>
                                <button type="button" className="close" id="closeEvents" data-dismiss="modal">&times;</button>
                            </div>
                            <div className='modal-body'>
                                <div className="card-body p-1">
                                    <ul className="mt-2">
                                        {this.state.eventList ? this.state.eventList.length ? this.state.eventList.map((item, index) =>
                                            {
                                                let modal_id = "newevent"+ index;
                                                return (<li key={index}>
                                                <div className="event-wrap mb-2">
                                                    <div className="row">
                                                        <div className="col-md-2 pr-0 text-center">
                                                            <div className="event-date mt-3">
                                                                <strong> <Moment format="MMM">{moment(item.schedule_date, 'YYYY-MM-DD hh:mm A')}</Moment>
                                                                    <br />  <Moment format="DD">{moment(item.schedule_date, 'YYYY-MM-DD hh:mm A')}</Moment></strong>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-7 border-left mt-3">
                                                            <div className="event-data">
                                                                <p className="mb-0">{item.title}: {item.description}</p>
                                                                <small>Location: {item.location}
                                                                <br/> Time: <Moment format="h:mm A">{moment(item.schedule_date, 'YYYY-MM-DD hh:mm A')}</Moment></small>
                                                                
                                                            </div>
                                                        </div>
                                                        <div class="col-md-3 comment-icons text-right mt-3">
                                                           
                                                                <i className="fa fa-edit  px-1 text-primary fa-lg" 
                                                                 data-toggle="modal"
                                                                 data-target={"#"+modal_id}
                                                                 data-backdrop="static"
                                                                 data-keyboard="false"
                                                                 onClick={() => this.editEvent(item,index)}>
                                                                </i>
                                                                <i class="fa fa-trash px-1 fa-lg"
                                                                onClick={() => this.deleteEvent(item)}></i>
                                                                {/* <i class="fa fa-ellipsis-v px-1 text-secondary"></i> */}
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
                               <div class="row">
                               <div className = "col-12 d-flex justify-content-center">   
                               <a href="/kontess/dashboard/events" className="btn">See all events</a>   
                               </div>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {this.state.eventList ? this.state.eventList.length ? this.state.eventList.map((item, index) => {
                 let modal_id = "newevent"+ index;
                return <NewEvent ModalId={modal_id} getAllEvents={this.getAllEvents} resetEvent={this.resetEvent} event={this.state.eventList && this.state.eventList[index]} dashboard={true} ></NewEvent>
                }
                 ): '' : ''}
                </div>
        );
    }
}
