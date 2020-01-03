/*
@copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author     : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained herein is, and remains
the property of ToXSL Technologies Pvt. Ltd. and its partners.
Unauthorized copying of this file, via any medium is strictly prohibited.
*/
import React, { Component } from "react";
import * as routes from "../../globals/endpoints";
import { toast } from 'react-toastify';
import { commonErrorMsg } from "../../../utils/Message";
import { postFetch, getFetch, postDelete } from "../../../utils/fetchRequests";
import DashboardTemplate from "../../components/dashboard-template/DashBoardTemplate";
import {
    KeyboardDatePicker,
    KeyboardTimePicker,
    MuiPickersUtilsProvider
} from "@material-ui/pickers";
import MomentUtils from '@date-io/moment';
import moment from "moment";
import { async } from "q";

export default class Task extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            submissionDueOnDate: moment(),
            submissionDueOnTime: moment(),
            gradesDueOnDate: moment(),
            gradesDueOnTime: moment(),
            questions: [],
            max_no_of_judge: '',
            loding: false,
            assing_to: 'teams'
        };
        this.formHandler = this.formHandler.bind(this);
    }

    componentWillMount = async () => {
        await this.addQuestions();
        let location = this.props.history.location.pathname;
        if (location.indexOf('modify-task') != -1) {
            this.setState({
                taskId: this.props.match.params.taskId,
            }, () => {
                this.getTaskDetail();
            })
        } else {
            if (this.props.location.state) {
                this.setState({
                    title: this.props.location.state.title,
                    description: this.props.location.state.description,
                    submissionDueOnDate: moment(this.props.location.state.submissionDueOnDate, 'YYYY-MM-DD, h:mm:ss a'),
                    submissionDueOnTime: moment(this.props.location.state.submissionDueOnTime, 'YYYY-MM-DD, h:mm:ss a'),
                    submissionDueDate: true,
                    submissionDueTime: true
                })
            }
        }
    }

    /**function for get task details */
    getTaskDetail = async () => {
        let self = this;
        await getFetch(`task/` + this.state.taskId + `/`)
            .then(resp => {
                if (resp.data) {
                    self.setState({
                        title: resp.data.title,
                        description: resp.data.description,
                        submissionDueOnDate: moment(resp.data.submission_due_date, 'YYYY-MM-DD, h:mm:ss a'),
                        submissionDueOnTime: moment(resp.data.submission_due_date, 'YYYY-MM-DD, h:mm:ss a'),
                        gradesDueOnDate: moment(resp.data.grade_due_date, 'YYYY-MM-DD, h:mm:ss a'),
                        gradesDueOnTime: moment(resp.data.grade_due_date, 'YYYY-MM-DD, h:mm:ss a'),
                        questions: resp.data.questions,
                        max_no_of_judge: resp.data.max_no_of_judge,
                        submissionDueDate: true,
                        submissionDueTime: true,
                        gradesDueDate: true,
                        gradesDueTime: true,
                        assing_to: resp.data.assing_to,
                        status: resp.data.status
                    });
                }
            })
            .catch(err => { });
    }


    combineDateAndTime = async (date, time) => {
        date = moment(date, 'YYYY-MM-DD');
        time = moment(time, 'hh:mm:ss a');
        let timeString = time.hour() + ':' + time.minutes() + ':00';
        var year = date.year();
        var month = date.month() + 1; // Jan is 0, dec is 11
        var day = date.date();
        var dateString = '' + year + '-' + month + '-' + day;
        var combined = new Date(dateString + ' ' + timeString);
        combined = moment(combined).format('YYYY-MM-DD, h:mm:ss a');
        return combined;
    };

    submit = async (e) => {
        e.preventDefault();
        const { submissionDueDate, submissionDueTime, gradesDueDate, gradesDueTime } = this.state;
        var validation = `${
            !submissionDueDate
                ? 'Please select submission due date'
                : !submissionDueTime
                    ? 'Please select submission due time'
                    : !gradesDueDate
                        ? 'Please select grades due date'
                        : !gradesDueTime
                            ? 'Please select grades due time'
                            : true
            }`;
        if (validation === 'true') {
            const { title, description, submissionDueOnDate, submissionDueOnTime, gradesDueOnDate, gradesDueOnTime, questions, max_no_of_judge, assing_to, status } = this.state;
            let submission_due_date = await this.combineDateAndTime(submissionDueOnDate, submissionDueOnTime);
            let grade_due_date = await this.combineDateAndTime(gradesDueOnDate, gradesDueOnTime);
            const data = { title, description, submission_due_date, grade_due_date, questions, max_no_of_judge, assing_to, status };
            let self = this;
            if (submission_due_date >= grade_due_date) {
                this.setState({
                    error: 'grade due date must be greater then submission due date'
                })
                return false
            }
            this.setState({
                loading: true
            })
            let url = "task/";
            if (this.state.taskId) {
                url = "task/" + this.state.taskId + "/update/"
            }
            await postFetch(url, data)
                .then(function (response) {
                    self.setState({
                        loading: false
                    })
                    if (response.status === 200) {
                        toast.success(response.msg);
                        self.props.history.push("/dashboard/task");
                    } else {
                        toast.error(response.msg);
                    }
                })
                .catch(err => {
                    self.setState({
                        loading: false
                    })
                    toast.error(commonErrorMsg);
                });
        } else {
            this.setState({
                error: validation,
                loading: false
            })
        }

    }

    addQuestions = async () => {
        let newQue = {}
        this.setState({
            questions: this.state.questions.concat(newQue)
        })
    }

    removeNode = (index) => {
        this.state.questions.splice(index, 1)
        this.setState({
            questions: this.state.questions
        })
    }
    gradingQuestions = (e, index, type) => {
        this.state.questions[index][e.target.name] = type ? e.target.checked : e.target.value;
        this.setState({
            questions: this.state.questions
        })
    }
    formHandler(event) {
        this.setState({ [event.target.name]: event.target.value });
    }
    setAssignTo(assing_to) {
        this.setState({
            assing_to: assing_to
        })
    }

    render() {
        const { questions, taskId } = this.state;
        return (
            <DashboardTemplate title={taskId ? 'Update task' : "Create task"} pageId="task" loading={this.state.loading}>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                    <div className="new-task-form">
                        <div className="card">
                            <div className="card-body p-5 clearfix"><form onSubmit={(e) => this.submit(e)}>
                                <div className="form-group">
                                    <input type="text" className="form-control border-grey" onChange={this.formHandler} name="title" value={this.state.title} placeholder="Task Name" required />
                                </div>
                                <div className="form-group">
                                    <textarea className="form-control border  border-grey" name="description" value={this.state.description} onChange={this.formHandler} rows="5" placeholder="Description" required></textarea>
                                </div>
                                <div className="form-group">
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="d-flex justify-content-between">
                                                <h6 className="font-weight-bold text-333f52 mr-4 mt-4">submission due on </h6>
                                                <KeyboardDatePicker
                                                    disablePast
                                                    format="MM/DD/YYYY"
                                                    variant="inline"
                                                    margin="normal"
                                                    id="date-picker-inline"
                                                    value={this.state.submissionDueOnDate}
                                                    onChange={(date) => this.setState({ submissionDueOnDate: date, submissionDueDate: true, error: '' })}
                                                    KeyboardButtonProps={{
                                                        'aria-label': 'change date',
                                                    }}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-md-4 text-center">
                                            <div className="d-flex">
                                                <h6 className="font-weight-bold text-333f52 mr-4 mt-4">at </h6>
                                                <KeyboardTimePicker
                                                    variant="inline"
                                                    margin="normal"
                                                    id="time-picker"
                                                    value={this.state.submissionDueOnTime}
                                                    onChange={(date) => this.setState({ submissionDueOnTime: date, submissionDueTime: true, error: '' })}
                                                    KeyboardButtonProps={{
                                                        'aria-label': 'change time',
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="d-flex justify-content-between">
                                                <h6 className="font-weight-bold text-333f52 mr-4 mt-4">grades due on </h6>
                                                <KeyboardDatePicker
                                                    format="MM/DD/YYYY"
                                                    disablePast
                                                    variant="inline"
                                                    margin="normal"
                                                    id="date-picker-inline"
                                                    value={this.state.gradesDueOnDate}
                                                    onChange={(date) => this.setState({ gradesDueOnDate: date, gradesDueDate: true, error: '' })}
                                                    KeyboardButtonProps={{
                                                        'aria-label': 'change date',
                                                    }}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-md-4 text-center">
                                            <div className="d-flex">
                                                <h6 className="font-weight-bold text-333f52 mr-4 mt-4">at </h6>
                                                <KeyboardTimePicker
                                                    variant="inline"
                                                    margin="normal"
                                                    id="time-picker"
                                                    value={this.state.gradesDueOnTime}
                                                    onChange={(date) => this.setState({ gradesDueOnTime: date, gradesDueTime: true, error: '' })}
                                                    KeyboardButtonProps={{
                                                        'aria-label': 'change time',
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="row mt-4">
                                        <div className="col-md-4">
                                            <div className="d-flex justify-content-between">
                                                <h6 className="font-weight-bold text-333f52 mr-4 ">Assign to </h6>
                                                <div className="ui checked radio checkbox">
                                                    <input type="radio" disabled={taskId && this.state.status !== 'Draft' ? true : false} checked={this.state.assing_to === 'teams'} name="teams" onChange={(e) => this.setAssignTo('teams')} />
                                                    <label>Teams</label>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-4 text-center">
                                            <div className="d-flex">
                                                <div className="ui checked radio checkbox" >
                                                    <input type="radio" disabled={taskId && this.state.status !== 'Draft' ? true : false} checked={this.state.assing_to === 'individuals'} name="individuals" onChange={(e) => this.setAssignTo('individuals')} />
                                                    <label>Individuals</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row justify-content-center gQ">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="control-label font-weight-bold text-333f52">Grading questions/criteria</label>
                                        </div>
                                    </div>
                                    <div className="col-md-3 text-center">
                                        <div className="form-group">
                                            <label className="control-label font-weight-bold text-333f52">Max Score</label>
                                        </div>
                                    </div>
                                    <div className="col-md-2 text-center">
                                        <div className="form-group">
                                            <label className="control-label font-weight-bold text-333f52">Allow feedback?</label>
                                        </div>
                                    </div>
                                    <div className="col-md-1 text-center">
                                    </div>
                                </div>

                                {questions
                                    ? questions.map((item, index) => (
                                        <div className="row justify-content-center gQ fadeInAnimation">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <input value={item.question} name="question" onChange={(e) => this.gradingQuestions(e, index)} type="text" className="form-control mx-1 border-grey mb-2" required />
                                                </div>
                                            </div>
                                            <div className="col-md-3 text-center">
                                                <div className="form-group">
                                                    <input value={item.max_score} min="0" name="max_score" onChange={(e) => this.gradingQuestions(e, index)} type="number" className="form-control mx-1 border-grey mb-2 w-25 mx-auto" required />
                                                </div>
                                            </div>
                                            <div className="col-md-2 text-center">
                                                <div className="form-group">
                                                    <div className="form-group custom-checkbox">
                                                        <input type="checkbox" id={`select` + index} name="feedback" checked={item.feedback} onChange={(e) => this.gradingQuestions(e, index, 'checkBox')} />
                                                        <label className="bg-black" for={`select` + index}></label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-1 text-center">
                                                {index > 0 ? <i onClick={() => this.removeNode(index)} className="far fa-times-circle  fa-2x text-danger"></i> : ''}
                                            </div>
                                        </div>
                                    ))
                                    : ''}
                                <div className="form-group ">
                                    <a onClick={() => this.addQuestions()} className="mon-med text-primary"><i className=" fa fa-plus-circle  mr-2"></i> Add new line</a>
                                </div>
                                <div className="form-group">
                                    <div className="row">
                                        <div className="col-md-5">
                                            <div className="d-flex">
                                                <h6 className="font-weight-bold text-333f52 mr-4">Maximum number of judges: </h6>
                                                <input type="number" min="0" onChange={this.formHandler} name="max_no_of_judge" value={this.state.max_no_of_judge} className="form-control mx-1 border-grey mb-2 w-25" required />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <p className="red">{this.state.error}</p>
                                <div className="save-button">
                                    <button type="submit" onClick={(e) => this.setState({ status: 'Publish' })} className="btn btn-success btn-block" value="Publish">{taskId && this.state.status !== 'Draft' ? 'Update' : "Save"}</button>
                                    {!this.state.taskId || this.state.status === 'Draft' ? <button type="submit" onClick={(e) => this.setState({ status: 'Draft' })} className="btn btn-sm btn-light border border-secondary btn-block text-center" value="Draft">Save Draft</button> : ''}
                                </div>
                            </form>
                            </div>
                        </div>
                    </div>
                </MuiPickersUtilsProvider>
            </DashboardTemplate >
        );
    }
}