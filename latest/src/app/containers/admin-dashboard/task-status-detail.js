
import React from "react";
import $ from 'jquery';
//import { async } from "q";
import { getFetch } from "../../../utils/fetchRequests";
//import { type } from "os";
import moment from 'moment';
import Moment from 'react-moment';
import Pagination from '../../components/pagination';
import { Loading } from '../../globals/contants';
import { Link } from "react-router-dom";
import Progress from './Card';
import ManageTracks from '../tracks/index';

export default class TaskStatusDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      progress1: 0,
      perPage: 3
    };
  }
  componentDidMount = () => {
    this.getProgressStatus();

  }

  /**function for get progress status */
  getProgressStatus = async (offset = 0) => {
    let self = this;
    this.setState({
      data: []
    })
    await getFetch('task/submission-status/?limit=' + this.state.perPage + '&offset=' + offset)
      .then(resp => {
        if (resp.data) {
          self.setState({
            data: resp,
            count: resp.count,
          }, () => {
            self.progressCounter();
          })
        }
      })
      .catch(err => { });
  }

  // handle pagination
  handlePagination = (data) => {
    let self = this;
    let selected = data.selected;
    let offset = Math.ceil(selected * self.state.perPage);
    self.getProgressStatus(offset);
  }

  getProgress = (task_submission_counts, type, due) => {
    if (task_submission_counts) {
      let percentage = this.percentage(task_submission_counts.submit, task_submission_counts.total_task);
      return <div>
        {this.getTaskStatus(due)}
        <div className="progress">
          <div className={`progress-bar ${percentage < 50 ? 'bg-danger' : percentage < 99 && percentage >= 50 ? 'bg-primary' : 'bg-success'}`} role="progressbar" aria-valuenow={percentage} aria-valuemin="0" aria-valuemax="100">{percentage}</div>
        </div>
        <small> {task_submission_counts.submit} out of {task_submission_counts.total_task} {type === 'teams' ? 'teams' : 'participants'} submitted </small>
      </div>
    }
  }

  getGradingProgress = (task_grading_counts, due) => {
    // console.log("task_grading_counts", task_grading_counts)
    if (task_grading_counts) {
      let percentage = this.percentage(task_grading_counts.judge_graded, task_grading_counts.total_no_of_juges);
      // console.log("percentage", percentage)
      return <div>
        {this.getTaskStatus(due)}
        <div className="progress">
          <div className={`progress-bar ${percentage < 50 ? 'bg-danger' : percentage < 99 && percentage >= 50 ? 'bg-primary' : 'bg-success'}`} role="progressbar" aria-valuenow={percentage} aria-valuemin="0" aria-valuemax="100">{percentage}</div>
        </div>
        <small> {task_grading_counts.judge_graded} out of {task_grading_counts.total_no_of_juges} Judges/Coachs finished grading </small>
      </div>
    }
  }

  getTaskStatus = (due) => {
    due = moment(due, 'YYYY-MM-DD hh:mm A');
    let status;
    let text_class;
    if (moment() < due) {
      status = 'due ';
      text_class = 'text-warning';
    } else if (moment() > due) {
      status = 'past due';
      text_class = 'text-danger';
    }
    return <small className={`d-block ${text_class}`}>{status} <Moment
      from={moment().format('YYYY-MM-DD hh:mm:ss')}
    >
      {due}
    </Moment>, <Moment format="ll">{due}</Moment></small>
  }

  percentage = (partialValue, totalValue) => {
    if (totalValue !== 0) {
      let value = (100 * partialValue) / totalValue
      return Math.ceil(value);
    }
    return 0;
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

  render() {
    return (
        <div className="modal fade" id="taskStatusDetail">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Task Status</h5>
                        <button type="button" className="close" id="closeRegistration" data-dismiss="modal">&times;</button>
                    </div>
                        <div className="modal-body">
                           <div className = "row mt-4 mb-4">
                            <div className = "col-6">
                            <ManageTracks  dashboard={true}/>
                            </div>
                            <div className="col-6">
<a href="/kontess/dashboard/tracks" className="btn float-right">Manage tracks</a>
                            </div>
                           </div>
                           <div class="row mt-4 mb-4">
                           <div className = "col-6">
                           <Progress title="Submission Status" dashboard = {true} />
                            </div>
                            <div className="col-6">
                            <Progress title="Grading Status" type="grading" dashboard = {true} />
                            </div>
                           </div>
                        </div>
                        {/* <div className="modal-footer">
                            <button id="submit_btn" type="submit" className="btn btn-primary">Submit </button>
                        </div> */}
                </div>
            </div >
        </div >
);
  }
}
