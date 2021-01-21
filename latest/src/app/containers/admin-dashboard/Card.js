
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

export default class Card extends React.Component {
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
    if (task_grading_counts) {
      let percentage = this.percentage(task_grading_counts.judge_graded, task_grading_counts.total_no_of_juges);
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
    const { data } = this.state;
    return (
      <div>
        {data ? <div>
          <div className="row align-items-center mb-3">
            <div className="col-md-9"><h6 className="mt-2 mb-0">{this.props.title}</h6></div>
            {this.props.sort ? <div className="col-md-3">
              <div className="position-relative">
                <select className="form-control">
                  <option>sort by</option>
                </select>
                <div className="select-icon-absolute position-absolute">
                  <i className="fa fa-caret-down"></i>
                </div>
              </div>
            </div> : ''}
          </div>
          {this.props.type !== 'grading' ?
            <div>
              {data.data ? data.data.length ? data.data.map((item, index) => (
                <div className="card mb-1 mt-mob-4" key={index}>
                  <div className="card-body p-2">
                    <Link to={'/dashboard/task-view/' + item.id} >  <strong className="font-family-open">{item.title}</strong></Link>
                    {this.getProgress(item.task_submission_counts, item.assing_to, item.submission_due_date)}
                  </div>
                </div>
              )) : <h6 className="text-center">No data found!</h6> : <Loading minHeight={268} />}
              <Pagination perPage={this.state.perPage} count={this.state.count} handlePageClick={(ev) => this.handlePagination(ev)} />
            </div> : <div>
              {data.data ? data.data.length ? data.data.map((item, index) => (
                <div className="card mb-1 mt-mob-4" key={index}>
                  <div className="card-body p-2">
                    <Link to={'/dashboard/task-view/' + item.id} >  <strong className="font-family-open">{item.title}</strong></Link>
                    {this.getGradingProgress(item.task_grading_counts, item.grade_due_date)}

                  </div>
                </div>
              )) : <h6 className="text-center">No data found!</h6> : <Loading minHeight={268} />}
              <Pagination perPage={this.state.perPage} count={this.state.count} handlePageClick={(ev) => this.handlePagination(ev)} />
            </div>}
        </div> : ''}
      </div>
    );
  }
}
