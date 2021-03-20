
import React from 'react';
import { toast } from 'react-toastify';
import * as session from '../../../utils/session';
import { getFetch, postDelete } from '../../../utils/fetchRequests';
import { commonErrorMsg } from '../../../utils/Message';
import { Link } from "react-router-dom";
import moment from 'moment';
import Pagination from '../../components/pagination';
import { confirmAlert } from 'react-confirm-alert';
import { Loading } from '../../globals/contants';
import {
    deleteTaskMsg
} from '../../../utils/Message';
import TaskStatusDetail  from '../admin-dashboard/task-status-detail'
export default class TaskList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            perPage: 5,
            userId: session.getSessionUserId()
        };
    }

    componentWillMount = async () => {
        await this.getTask();
        let UserType = await session.getUserType();
        this.setState({
            UserType: UserType
        })
    };

    getTask = async (offset = 0, sortBy = '-created_on') => {
        let self = this;
        this.setState({
            tasks: []
        })
        await getFetch('task/?sort_by=' + sortBy + '&limit=' + this.state.perPage + '&offset=' + offset)
            .then(resp => {
                if (resp.data) {
                    self.setState({
                        tasks: resp,
                        count: resp.count,
                        sortBy: sortBy
                    });
                }
            })
            .catch(err => { });
    }
    change = (event) => {
        this.setState({ value: event.target.value });
        this.getTask(0, event.target.value);
    }
    // handle pagination
    handlePagination = (data) => {
        let self = this;
        let selected = data.selected;
        let offset = Math.ceil(selected * self.state.perPage);
        self.getTask(offset);
    }

    getTaskStatus = (task) => {
        let submission_due_date = moment(task.submission_due_date, 'YYYY-MM-DD hh:mm A');
        let grade_due_date = moment(task.grade_due_date, 'YYYY-MM-DD hh:mm A');
        let status;
        let text_class;
        if (moment() < submission_due_date) {
            status = 'submission on going';
            text_class = 'text-primary';
        } else if (moment() > submission_due_date && moment() < grade_due_date) {
            status = 'submission finished now grading on going';
            text_class = 'text-info';
        } else if (moment() > grade_due_date && moment() > submission_due_date) {
            status = 'judging finished';
            text_class = 'text-success';
        }
        return <p className={`d-block pt-2 m-0 ${text_class}`}>{status}</p>
    }

    deleteTask = (id) => {
        confirmAlert({
            title: 'Confirm',
            message: deleteTaskMsg,
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => this.confirmDelete(id)
                },
                {
                    label: 'No'
                }
            ]
        });
    }


    confirmDelete = async (id) => {
        let self = this;
        await postDelete(`task/` + id + `/`)
            .then(resp => {
                if (resp.msg) {
                    toast.success(resp.msg);
                    self.getTask();
                } else {
                    toast.error(commonErrorMsg);
                }
            })
            .catch(err => { });
    }
    render() {
        const { tasks } = this.state;
        return (
            this.props.dashboard ? 
            <div className="card">
            <div className = "card-header" style={{padding:"1rem 0 1rem 1rem"}}>
<h5 className="d-inline-block">Task Status</h5>
<a className="btn btn-default float-right" data-toggle="modal" data-target="#taskStatusDetail" style={{paddingTop:"0px"}}>See more</a>
</div>
<div className="card-body">
<div className="card-text">
{tasks.data ? tasks.data.length ? tasks.data.map((task, index) => {

return(
<div className="card mb-1 mt-mob-4" key={index}>
    <div className="card-body p-2 px-3 d-flex justify-content-between align-items-center row m-0 ">
        {
            task.status !== 'Draft'
            ?
                <Link to={'/dashboard/task-view/' + task.id} className="tak-list col-md-10">
                    <strong className="font-family-open">{task.title}</strong>
                    <span className={`ml-2 badge badge-pill ${task.assing_to && task.assing_to === 'teams' ? 'badge-info' : 'badge-warning'}`} >
                        {task.assing_to && task.assing_to === 'teams' ? '(Team Task)' : '(Individual)'}
                    </span>
                    {this.getTaskStatus(task)}
                </Link>
            :
                <div className="col-md-10">
                    <strong className="font-family-open">{task.title}</strong>
                    <span className={`ml-2 badge badge-pill ${task.assing_to && task.assing_to === 'teams' ? 'badge-info' : 'badge-warning'}`} >
                        {task.assing_to && task.assing_to === 'teams' ? '(Team Task)' : '(Individual)'}
                    </span>
                        {task.status === 'Draft' ? <span className={`ml-2 badge badge-pill badge-secondary`} >Draft</span> : ''}
                </div>
        }

        <div className="icon-bar col-md-2 text-right">
            <Link to={'/dashboard/modify-task/' + task.id} >
                <i className="fa fa-edit  px-1 text-primary fa-lg mr-2"></i>
            </Link>
            <i className="fa fa-trash px-1 fa-lg" onClick={() => this.deleteTask(task.id)}></i>
            {/* <i className="fa fa-ellipsis-v px-1 text-secondary"></i> */}
        </div>
    </div>

</div>
)}) : <h6 className="text-center">No task found!</h6> : <Loading />}
  </div>
  <div className="col d-flex justify-content-center">
    <a href="/kontess/dashboard/create-task" className="btn btn-primary">Create new task</a>                          
                        </div>
</div>
<TaskStatusDetail/>
</div> : 
            <div className="col-lg-7">
                <div className="row align-items-center mb-3">
                    <div className="col-md-7"><h6 className="mt-2 mb-0">Task Status</h6></div>
                    <div className="col-md-5">
                        <div className="position-relative">
                            <select className="form-control" onChange={(e) => this.change(e)} value={this.state.sortBy}>
                                <option value="">sort by</option>
                                <option value="created_on">sort by created time asc</option>
                                <option value="-created_on">sort by created time desc</option>
                                <option value="title">sort by title A-Z</option>
                                <option value="-title">sort by title Z-A</option>
                                <option value="submission_due_date">sort by submission due date asc</option>
                                <option value="-submission_due_date">sort by submission due date desc</option>
                                <option value="grade_due_date">sort by grade due date asc</option>
                                <option value="-grade_due_date">sort by grade due date desc</option>
                            </select>
                            <div className="select-icon-absolute position-absolute">
                                <i className="fa fa-caret-down"></i>
                            </div>
                        </div>
                    </div>
                </div>
                {tasks.data ? tasks.data.length ? tasks.data.map((task, index) => {

                    return(
                    <div className="card mb-1 mt-mob-4" key={index}>
                        <div className="card-body p-2 px-3 d-flex justify-content-between align-items-center row ">
                            {
                                task.status !== 'Draft'
                                ?
                                    <Link to={'/dashboard/task-view/' + task.id} className="tak-list col-md-10">
                                        <strong className="font-family-open">{task.title}</strong>
                                        <span className={`ml-2 badge badge-pill ${task.assing_to && task.assing_to === 'teams' ? 'badge-info' : 'badge-warning'}`} >
                                            {task.assing_to && task.assing_to === 'teams' ? '(Team Task)' : '(Individual)'}
                                        </span>
                                        {this.getTaskStatus(task)}
                                    </Link>
                                :
                                    <div className="col-md-10">
                                        <strong className="font-family-open">{task.title}</strong>
                                        <span className={`ml-2 badge badge-pill ${task.assing_to && task.assing_to === 'teams' ? 'badge-info' : 'badge-warning'}`} >
                                            {task.assing_to && task.assing_to === 'teams' ? '(Team Task)' : '(Individual)'}
                                        </span>
                                            {task.status === 'Draft' ? <span className={`ml-2 badge badge-pill badge-secondary`} >Draft</span> : ''}
                                    </div>
                            }

                            <div className="icon-bar col-md-2 text-right">
                                <Link to={'/dashboard/modify-task/' + task.id} >
                                    <i className="fa fa-edit  px-1 text-primary fa-lg mr-2"></i>
                                </Link>
                                <i className="fa fa-trash px-1 fa-lg" onClick={() => this.deleteTask(task.id)}></i>
                                <i className="fa fa-ellipsis-v px-1 text-secondary"></i>
                            </div>
                        </div>

                    </div>
                )}) : <h6 className="text-center">No task found!</h6> : <Loading />}
                <Pagination perPage={this.state.perPage} count={this.state.count} handlePageClick={(ev) => this.handlePagination(ev)} />
            </div>
        );
    }
}
