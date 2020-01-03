/*
@copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author     : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained herein is, and remains
the property of ToXSL Technologies Pvt. Ltd. and its partners.
Unauthorized copying of this file, via any medium is strictly prohibited.
*/
import React from "react";
import { commonErrorMsg } from "../../../utils/Message";
import { single, double } from "../../globals/contants";
import { toast } from "react-toastify";
import { postFetch } from "../../../utils/fetchRequests";
import { display } from "@material-ui/system";
import Moment from 'react-moment';
export default class ViewAnnouncement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    render() {
        return (
            <div className="modal fade" id="showAnnouncement">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Announcement View</h5>
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                        </div>
                        <form onSubmit={this.submit} id="newEventForm" >
                            <div className="modal-body">
                                <div className="new-task-form">
                                    <div className="form-group">
                                        <label className="control-label">Announcement</label>
                                        <h5>{this.props.data ? this.props.data.announcement.description : ''}</h5>
                                    </div>
                                    <div className="form-group text-right">
                                        <label className="control-label line0">Created on</label><br />
                                        <span><Moment format="lll">{this.props.data ? this.props.data.announcement.created_on : ''}</Moment></span>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div >
            </div >
        );
    }
}
