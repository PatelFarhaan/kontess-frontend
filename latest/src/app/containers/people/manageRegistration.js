
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
            date: moment()
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

    submit = async event => {
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
                    toast.success(response.msg);
                    document.getElementById("closeRegistration").click();
                } else {
                    toast.error(commonErrorMsg);
                }
            })
            .catch(err => {
                toast.error(commonErrorMsg);
            });
    };

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
                            <form onSubmit={this.submit} id="newEventForm" >
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
                                                            <input type="number" min="0" required value={this.state.participant_count} onChange={this.formHandler} name="participant_count" className="form-control" placeholder="Deadline" required />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group mb-0">
                                                    <div className="row">
                                                        <div className="col-md-4 text-right">
                                                            <label className="control-label font-weight-bold">Judge/Coach</label>
                                                        </div>
                                                        <div className="col-md-4">
                                                            <input type="number" min="0" value={this.state.judge_count} onChange={this.formHandler} name="judge_count" className="form-control" placeholder="Deadline" required />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <div className="row">
                                                        <div className="col-md-4 text-right">
                                                            <label className="control-label font-weight-bold  mt-4">Last Date</label>
                                                        </div>
                                                        <div className="col-md-4">
                                                            <KeyboardDatePicker
                                                                minDate={this.state.minDate}
                                                                format="MM/DD/YYYY"
                                                                variant="inline"
                                                                margin="normal"
                                                                id="date-picker-inline"
                                                                value={this.state.date}
                                                                onChange={(date) => this.setState({ date: date })}
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
                                    <button type="submit" className="btn btn-primary">Submit </button>
                                </div>
                            </form>
                        </div>
                    </div >
                </div >
            </MuiPickersUtilsProvider>
        );
    }
}
