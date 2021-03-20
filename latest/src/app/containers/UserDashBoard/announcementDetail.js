
import React from "react";
import Moment from 'react-moment';
import { patchFetch, postFetch } from "../../../utils/fetchRequests";
import { toast } from 'react-toastify';
import ViewAnnouncement from './viewAnnouncement';
import { getFetch, postDelete } from "../../../utils/fetchRequests";
import Pagination from '../../components/pagination';
import * as session from "../../../utils/session";
import { commonErrorMsg, deleteAnnouncementMsg } from "../../../utils/Message";
import { confirmAlert } from 'react-confirm-alert';
import { Urlify } from '../../globals/contants';
import MomentUtils from '@date-io/moment';
import moment from "moment";
import Chart from 'chart.js';
export default class AnnouncementDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentWillReceiveProps(nextProps,prevProps) {
        if (nextProps != prevProps) {
             const {data} = nextProps;
            this.setState({... data});
        }
      }

      // handle pagination
  handlePagination = (data) => {
    let self = this;
    let selected = data.selected;
    let offset = Math.ceil(selected * self.state.perPage);
    self.props.announcementData(offset);
  }

    formHandler = (event) => {
        this.setState({ [event.target.name]: event.target.value, error: '' });
    }

    handleCheckBox = () => {
        this.setState({
            status: !this.state.status
        })
    }

    getRegistrationConfig = async () => {
        let self = this;
        await getFetch(`manage-registration/myconfig/`)
            .then(resp => {
                if (resp.data) {
                    self.setState({
                        judge_count: resp.data.judge_count,
                        participant_count: resp.data.participant_count,
                        status: resp.data.status,
                        date: resp.data.reg_date ? moment(resp.data.reg_date, 'YYYY-MM-DD') : moment(),
                        minDate: resp.data.reg_date ? moment(resp.data.reg_date, 'YYYY-MM-DD') <= moment() ? moment(resp.data.reg_date, 'YYYY-MM-DD') : moment() : moment()
                    });
                }
            })
            .catch(err => { });
    }
      // get the number
  getNumber = (value) => {
    return value ? value : 0;
  }

    submit = async (event) => {
        let self = this;
        self.setState({ error: '' });
        event.preventDefault();
        const { participant_count, judge_count, status, date } = self.state;
        let reg_date = date
        reg_date = moment(reg_date).format('YYYY-MM-DD')
        const data = { participant_count, judge_count, status, reg_date };
        await postFetch(`manage-registration/myconfig/`, data)
            .then(function (response) {
                if (response && response.msg) {
                    toast.success(response.msg, {toastId: "deadline_update_success"});
                    document.getElementById("closeRegistration").click();
                } else {
                    toast.error(commonErrorMsg, {toastId: "deadline_update_error"});
                }
            })
            .catch(err => {
                toast.error(commonErrorMsg);
            });
    };
    /*
    validateRegistration = (event) => {
        var validate = true;
        event.preventDefault();
        var participant_count = document.getElementById("participant_count");
        var judge_count = document.getElementById("judge_count");
        if (!participant_count.checkValidity()) {
            document.getElementById("participant_invalid").innerHTML = participant_count.validationMessage;
            validate = false;
        }
        else
            document.getElementById("participant_invalid").innerHTML = "";
        if (!judge_count.checkValidity()) {
            document.getElementById("judge_invalid").innerHTML = judge_count.validationMessage;
            validate = false;
        }
        else
            document.getElementById("judge_invalid").innerHTML = "";
        if(validate)
            this.submit();
    }*/

    render() {
        const { userType } = this.state;
        return (
                <div className="modal fade" id="announcementDetail">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Announcements</h5>
                                <button type="button" className="close" id="closeRegistration" data-dismiss="modal">&times;</button>
                            </div>
                                <div className="modal-body">
                                   <div className = "row">
                                    <div className = "col-12">
                                    <div className="card">
          <div className="card-body px-5 py-4">
            {this.state.announcementData ? this.state.announcementData.map((data, index) => (
              <div key = {index} className={`comment-widgets mb-4 no-hover p-3 ${data.is_read === false ? 'bg-dark' : ''}`}>
                <div className="d-flex flex-row comment-row border-0 row">
                  <div className={`comment-text border-0 ml-0 pl-0 ${userType === 'admin' ? 'col-md-5' : 'col-md-6'}`} data-toggle="modal" data-target="#showAnnouncement" key={index} onClick={(e) => this.props.showAnnouncement(data, index)}>
                    <h6 className="text-muted text-justify"
                      dangerouslySetInnerHTML={{
                        __html: Urlify(data.announcement.description)
                      }}
                    ></h6>
                  </div>
                  <div className="col-md-4 comment-icons text-right">
                    {this.state.userType !== 'admin' ?
                      <div className="rate-view ml-3 mb-3" onClick={() => this.props.starAnnouncement(data.id, index, data.is_star)}>
                        <i className={`fa-star ` + (data.is_star ? "fas" : "far")} ></i>
                      </div> : ''}
                    <h6 className="m-b-5 text-muted d-block" >
                      <Moment format="MM/DD/YYYY">{data.announcement.created_on}</Moment></h6>
                    <h6 className="text-muted"> <Moment format="hh:mm a">{data.announcement.created_on}</Moment></h6>

                  </div>
                  {userType === 'admin' ? <div className="col-md-3 comment-icons text-right">
                    <span onClick={() => this.props.editAnnouncement(data.announcement.id)}><i className="fa fa-edit  px-1 text-primary fa-lg mr-2" data-dismiss="modal"></i></span>
                    <i onClick={() => this.props.deleteAnnouncement(data.announcement.id)} className="fa fa-trash px-1 fa-lg"></i>
                  </div> : ''}
                </div>
              </div>
            )) : <h5 className="font-weight-light  mb-4 text-muted">No announcement found for you!</h5>}
          </div>
        </div>
                                    </div>
                                   </div>
                                </div>
                                {/* <div className="modal-footer">
                                    <button id="submit_btn" type="submit" className="btn btn-primary">Submit </button>
                                </div> */}
        <Pagination perPage={this.state.perPage} count={this.state.announcementcount} handlePageClick={(ev) => this.handlePagination(ev)} />
                        </div>
                    </div >
                </div >
        );
    }
}
