
import React from "react";
import { getFetch, postFetch } from "../../../utils/fetchRequests";
import * as session from "../../../utils/session";
import { toast } from 'react-toastify';
import { commonErrorMsg } from "../../../utils/Message";
import {
    KeyboardDatePicker,
    MuiPickersUtilsProvider
} from "@material-ui/pickers";
import MomentUtils from '@date-io/moment';
import moment from "moment";
export default class ManageRegistration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            participant_count: '',
            judge_count: '',
            status: false,
            date: ""
        };
    }

    formHandler = (event) => {
        this.setState({ [event.target.name]: event.target.value, error: '' });
    }

    handleCheckBox = () => {
        this.setState({
            status: !this.state.status
        })
    }

    componentWillMount = async () => {
        let UserType = await session.getUserType();
        this.setState({
            UserType: UserType
        })
        if (UserType === 'admin') {
            this.getRegistrationConfig();
        }
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
        const { status } = this.state;
        return (
            <MuiPickersUtilsProvider utils={MomentUtils}>
                <div className="modal fade" id="manageRegistration">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Deadline For Registration</h5>
                                <button type="button" className="close" id="closeRegistration" data-dismiss="modal">&times;</button>
                            </div>
                            <form id="newEventForm" onSubmit={this.submit}>
                                <div className="modal-body">
                                    <div className="new-task-form">
                                        <div className="form-group">
                                            <div className="form-sec">
                                                <div className="form-group">
                                                    <div className="row">
                                                        <div className="col-md-4 text-right">
                                                            <label className="control-label font-weight-bold">Participants</label>
                                                        </div>

                                                        <div className="col-md-4">
                                                            <input id="participant_count" type="number" min="1" max="10000" value={this.state.participant_count} onChange={this.formHandler} name="participant_count" className="form-control" placeholder="Required *" required />
                                                        </div>
                                                    </div>
                                                    <div id="participant_invalid" style={{color:"red", paddingLeft:"100px"}}></div>
                                                </div>
                                                <div className="form-group mb-0">
                                                    <div className="row">
                                                        <div className="col-md-4 text-right">
                                                            <label className="control-label font-weight-bold">Judge/Coach</label>
                                                        </div>
                                                        <div className="col-md-4">
                                                            <input id="judge_count" type="number" min="1" max="10000" value={this.state.judge_count} onChange={this.formHandler} name="judge_count" className="form-control" placeholder="Required *" required />
                                                        </div>
                                                    </div>
                                                    <div id="judge_invalid" style={{color:"red", paddingLeft:"100px"}}></div>
                                                </div>
                                                <div className="form-group">
                                                    <div className="row">
                                                        <div className="col-md-4 text-right">
                                                            <label className="control-label font-weight-bold  mt-4">Last Date</label>
                                                        </div>
                                                        <div className="col-md-4">
                                                            <KeyboardDatePicker
                                                                minDate={moment().startOf('day')}
                                                                maxDate={""}
                                                                autoOk={true}
                                                                format="MM/DD/YYYY"
                                                                variant="inline"
                                                                margin="normal"
                                                                id="date-picker-inline"
                                                                invalidDateMessage='Invalid Date!'
                                                                value={this.state.date}
                                                                onChange={(date) => {
                                                                    if(date && date.isValid()){
                                                                        this.setState({ date: date });
                                                                        if(date >= moment().startOf('day'))
                                                                            document.getElementById('submit_btn').removeAttribute("disabled");
                                                                    }
                                                                    else{
                                                                        this.setState({date: ""});
                                                                        document.getElementById('submit_btn').setAttribute("disabled","disabled");
                                                                    }
                                                                    }}
                                                                KeyboardButtonProps={{
                                                                    'aria-label': 'change date',
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <div className="row">
                                                        <div className="custom-control custom-checkbox dark-checkbox ml-5 d-inline-block">
                                                            <input type="checkbox" className="custom-control-input" id="customCheck1" onChange={(e) => this.handleCheckBox()} checked={status} />
                                                            <label className="custom-control-label ml-2" htmlFor="customCheck1">Activate Deadlines</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button id="submit_btn" type="submit" className="btn btn-primary">Submit </button>
                                </div>
                            </form>
                        </div>
                    </div >
                </div >
            </MuiPickersUtilsProvider>
        );
    }
}
