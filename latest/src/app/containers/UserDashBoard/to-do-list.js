
import React from "react";
import Moment from 'react-moment';
import { getFetch, postFetch } from "../../../utils/fetchRequests";
import { commonErrorMsg } from "../../../utils/Message";
import { toast } from 'react-toastify';
import Pagination from '../../components/pagination';
import { Link } from "react-router-dom";
import * as session from '../../../utils/session';
import moment from 'moment';

export default class ToDOList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            myTasks: [],
            perPage: 5,
            count: 0,
            userId: session.getSessionUserId(),
            type: this.props.type,
            userType: session.getUserType()
        };
    }
    componentWillMount = async () => {
        this.getMyTasks();
    }

    // handle pagination
    handlePagination = (data) => {
        let self = this;
        let selected = data.selected;
        let offset = Math.ceil(selected * self.state.perPage);
        self.getMyTasks(offset);
    }

    // Get my task
    getMyTasks = async (offset = 0) => {
        let self = this;
        let url = 'team_task/todo-list/'
        if (this.state.type === 'byAdmin') {
            url = 'participant_task/todo-list/'
        }
        await getFetch(`${url}?limit=${self.state.perPage}&offset=${offset}`).then((resp) => {
            if (resp.data) {
                self.setState({ myTasks: resp.data, count: resp.count });
            }
        }).catch(err => { })
    }

    render() {
        const { userId, type, userType } = this.state;
        return (
            <div className="todo-list-section mt-5">
                <h5 className="mb-4 text-muted">{this.props.title}</h5>
                {type === 'byTeam' ?
                    <div>
                        <div className="card">
                            <div className="card-body px-5 py-4">
                                {this.state.myTasks.length ? this.state.myTasks.map((task, index) => (
                                    <div key={task.team_task.id} className="comment-widgets mb-4 bg-dark no-hover">
                                        <div className="d-flex flex-row comment-row border-0">
                                            <div className="tesk-detail w-100 border-0 ml-0 pl-0">
                                                <Link to={'/dashboard/edit-team-task/' + task.team.id + '/' + task.team_task.id}><h4 className="mb-0">{task.team_task.title}</h4><h5 className="text-muted mb-0">Team - {task.team.name}</h5> </Link>
                                                <h6 className="text-muted mb-0 event-name">
                                                    Created By : {task.team_task.created_by.id === userId ? 'Me' : task.team_task.created_by.full_name}
                                                </h6>
                                            </div>
                                        </div>
                                    </div>)) : <h5 className="font-weight-light  mb-4 text-muted">No task found for you!</h5>}
                            </div>
                        </div>
                        <Pagination perPage={this.state.perPage} count={this.state.count} handlePageClick={(ev) => this.handlePagination(ev)} />
                    </div> : <div>
                        <div className="card">
                            <div className="card-body px-5 py-4">
                                {this.state.myTasks.length ? this.state.myTasks.map((task, index) => (
                                    <div className={'comment-widgets no-hover border border-dark mb-0 '}>
                                        <div className="card-header border-0 bg-d7 p-2" id="headingOne">
                                            <Link to={'/dashboard/task'}>
                                                <div className={'d-block click-data collapsed '} data-toggle="collapse" data-target={"#collapseOne" + task.task.id} aria-expanded="false" aria-controls="collapseOne">
                                                    <div className="d-flex flex-row comment-row border-0 p-1">
                                                        <div className="tesk-detail w-100 border-0 ml-0 pl-0">
                                                            <div>
                                                                <h6 className="d-inline-block mb-0">{task.task.title}</h6>
                                                                {userType === 'judge' ? <span className={`ml-2 badge badge-pill ${task.task.assing_to && task.task.assing_to === 'teams' ? 'badge-info' : 'badge-warning'}`} >{task.task.assing_to && task.task.assing_to === 'teams' ? '(Team)' : '(Individual)'}</span>
                                                                    : <span className={`ml-2 badge badge-pill ${task.task.assing_to && task.task.assing_to === 'teams' ? 'badge-info' : 'badge-warning'}`} >{task.task.assing_to && task.task.assing_to === 'teams' ? '(Team - ' + task.team.name + ')' : '(Individual)'}</span>
                                                                }
                                                            </div>
                                                            <span className="text-line-clamp">description: {task.task.description}</span>
                                                        </div>
                                                        <div className="task-state w-100 text-right mr-4 text-danger">
                                                            {userType === 'judge' ?
                                                                <div>Grade due <Moment format="lll">{moment(task.task.grade_due_date, 'YYYY-MM-DD hh:mm A')}</Moment></div> :
                                                                <div>Submission   due  <Moment format="lll">{moment(task.task.submission_due_date, 'YYYY-MM-DD hh:mm A')}</Moment></div>
                                                            }

                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                )) : <h5 className="font-weight-light  mb-4 text-muted">No task found for you!</h5>}
                            </div>

                        </div>
                        <Pagination perPage={this.state.perPage} count={this.state.count} handlePageClick={(ev) => this.handlePagination(ev)} />
                    </div>}
            </div>
        );
    }
}
