
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
export default class FileName extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file_name: ''
        };
    }

    formHandler = (event) => {
        this.setState({ [event.target.name]: event.target.value, error: '' });
    }

    submit = async event => {
        event.preventDefault();
        this.props.download(this.state.file_name);
    };

    render() {
        const { status } = this.state;
        return (
            <MuiPickersUtilsProvider utils={MomentUtils}>
                <div className="modal fade" id="fileNameModal">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">File name for download</h5>
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
                                                            <label className="control-label font-weight-bold">File name</label>
                                                        </div>
                                                        <div className="col-md-8">
                                                            <input type="text" required value={this.state.file_name} onChange={this.formHandler} name="file_name" className="form-control" placeholder="filename" required />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="submit" className="btn btn-primary">Download </button>
                                </div>
                            </form>
                        </div>
                    </div >
                </div >
            </MuiPickersUtilsProvider>
        );
    }
}
