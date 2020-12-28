
import React/*, { Component }*/ from "react";
import DashboardTemplate from "../../components/dashboard-template/DashBoardTemplate";
import $ from 'jquery';
//import { Link } from "react-router-dom";
import TaskList from './taskList';
import MomentUtils from '@date-io/moment';
import moment from "moment";
import {
    KeyboardDatePicker,
    KeyboardTimePicker,
    MuiPickersUtilsProvider
} from "@material-ui/pickers";

import Progress from '../admin-dashboard/Card'

export default class Task extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.formHandler = this.formHandler.bind(this);
    }
    componentDidMount = () => {
        this.progressCounter();
    }
    progressCounter = () => {
        var delay = 500;
        $(".progress-bar").each(function (i) {
            $(this).delay(delay * i).animate({ width: $(this).attr('aria-valuenow') + '%' }, delay);

            $(this).prop('Counter', 0).animate({
                Counter: $(this).text()
            }, {
                duration: delay,
                easing: 'swing',
                step: function (now) {
                    $(this).text(Math.ceil(now) + '%');
                }
            });
        });
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
        const { submissionDueDate, submissionDueTime } = this.state;
        var validation = `${
            !submissionDueDate
                ? 'Please select submission due date'
                : !submissionDueTime
                    ? 'Please select submission due time'
                    : true
            }`;
        if (validation === 'true') {
            const { title, description, submissionDueOnDate, submissionDueOnTime } = this.state;
            let submission_due_date = await this.combineDateAndTime(submissionDueOnDate, submissionDueOnTime)
            this.props.history.push({
                pathname: '/dashboard/create-task',
                state: {
                    title: title,
                    description: description,
                    submissionDueOnDate: submission_due_date,
                    submissionDueOnTime: submission_due_date
                }
            })
        } else {
            this.setState({
                error: validation,
                loading: false
            })
        }

    }
    formHandler(event) {
        this.setState({ [event.target.name]: event.target.value });
    }
    render() {
        return (
            <DashboardTemplate title="Task" pageId="task">
                <div className="dashboard-grid">
                    <section className="dasboard-mid mt-2">
                        <div className="row justify-content-between">
                            <div className="col-lg-5">
                                <Progress title="Submission Status" />
                            </div>
                            <div className="col-lg-5">
                                <Progress title="Grading Status" type="grading" />
                            </div>
                        </div>
                        <br />
                        <div className="row justify-content-between">
                            <TaskList />
                            <div className="col-md-5">
                                <div className="mr-4">
                                    <div className="row align-items-center mb-3">
                                        <div className="col-md-9"><h6 className="mt-2 mb-0">Create Task</h6></div>
                                    </div>
                                    <div className="form-sec">
                                        <MuiPickersUtilsProvider utils={MomentUtils}>
                                            <form onSubmit={(e) => this.submit(e)}>
                                                <div className="form-group">
                                                    <input autoComplete="off" type="text" className="form-control border-grey" onChange={this.formHandler} name="title" value={this.state.title} placeholder="Task Name" required />
                                                </div>
                                                <div className="form-group mb-0">
                                                    <textarea className="form-control border  border-grey" name="description" value={this.state.description} onChange={this.formHandler} rows="5" placeholder="Description" required></textarea>
                                                </div>
                                                <div className="form-group d-flex">
                                                    <div className="col-md-6">
                                                        <KeyboardDatePicker
                                                            disablePast
                                                            label="Submission due date"
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
                                                    <div className="col-md-6">
                                                        <KeyboardTimePicker
                                                            label="Submission due time"
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
                                                <p className="red">{this.state.error}</p>
                                                <button type="submit" className="btn btn-lg btn-success btn-block text-center">Continue to adding task</button>
                                            </form>
                                        </MuiPickersUtilsProvider>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </section>
                </div>
            </DashboardTemplate>
        );
    }
}