
import React/*, { Component }*/ from "react";
//import * as routes from "../../globals/endpoints";
//import { toast } from 'react-toastify';
//import { commonErrorMsg } from "../../../utils/Message";
//import { profileLogo, emailRegex } from '../../globals/contants';
import DashboardTemplate from "../../components/dashboard-template/DashBoardTemplate";
import { getFetch } from "../../../utils/fetchRequests";
//import * as session from "../../../utils/session";
import EventCalender from '../Activity/eventCalender';
import Moment from 'react-moment';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Loading } from '../../globals/contants';
import Pagination from '../../components/pagination';

export default class JudgeTask extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            perPage: 10,
            tasks: []
        };
    }

    componentWillMount = async () => {
        await this.getTask();
    }

    getTask = async (offset = 0) => {
        let self = this;
        this.setState({
            tasks: []
        })
        await getFetch('participant_task/live-judge-task/?&limit=' + this.state.perPage + '&offset=' + offset)
            .then(resp => {
                if (resp.data) {
                    self.setState({
                        tasks: resp,
                        count: resp.count
                    });
                }
            })
            .catch(err => { });
    }

    // handle pagination
    handlePagination = (data) => {
        let self = this;
        let selected = data.selected;
        let offset = Math.ceil(selected * self.state.perPage);
        self.getTask(offset);
    }
    render() {
        const { tasks } = this.state;
        let is_live_judge = true
        return (
            <DashboardTemplate title="Task" pageId="live-judge">
                <div className="setting_container">
                    <div className="chat-container clearfix">
                        <div className="row">
                            <div className="col-lg-7">
                                <div className="accordion" id="accordionExample">
                                    {
                                        tasks.data ? tasks.data.length
                                            ?
                                            tasks.data.map((task, index) => {
                                                let submission_due_date_check = moment() < moment(task.submission_due_date, 'YYYY-MM-DD, h:mm:ss a')
                                                let grade_due_date_check = moment() > moment(task.grade_due_date, 'YYYY-MM-DD, h:mm:ss a')

                                               return (
                                                    <div className={'comment-widgets no-hover border border-dark mb-0 '} key={index}>
                                                        <div className="card-header border-0 bg-d7 p-2" id="headingOne">

                                                            <div className={'d-block click-data collapsed '} data-toggle="collapse" data-target={"#collapseOne" + task.id} aria-expanded="false" aria-controls="collapseOne">
                                                                <div className="d-flex flex-row comment-row border-0 p-1">
                                                                    <div className="tesk-detail w-100 border-0 ml-0 pl-0">
                                                                        <div>
                                                                            <h6 className="d-inline-block mb-0">{task.title}</h6>
                                                                            <span className={`ml-2 badge badge-pill ${task.assing_to && task.assing_to === 'teams' ? 'badge-info' : 'badge-warning'}`} >
                                                                                {task.assing_to && task.assing_to === 'teams' ? '(Team)' : '(Individual)'}
                                                                            </span>
                                                                        </div>
                                                                        <span className="">
                                                                            description: {task.description}
                                                                        </span>
                                                                    </div>
                                                                    <div className="task-state w-100 text-right mr-4">
                                                                        Grading due  <Moment format="lll">{moment(task.grade_due_date, 'YYYY-MM-DD hh:mm A')}</Moment>
                                                                        <span className="submit-date d-block"></span>
                                                                        <Link to={'/dashboard/live-task-view/' + task.id} className="btn btn-md px-4 rounded-0 btn-primary">
                                                                            View
                                                                        </Link>
                                                                        {
                                                                            submission_due_date_check
                                                                            ?
                                                                                <span className="submit-date d-block text-info">
                                                                                    Task will open for grading on  <Moment format="lll">{moment(task.submission_due_date, 'YYYY-MM-DD hh:mm A')}</Moment>
                                                                                </span>
                                                                            :
                                                                            // grade_due_date_check
                                                                            // ?
                                                                            //     <h5 className="text-danger">Grading closed</h5>
                                                                            // :
                                                                                ""
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                )
                                            })
                                            : <h6 className="text-center">No task found!</h6> : <Loading />}
                                    <Pagination perPage={this.state.perPage} count={this.state.count} handlePageClick={(ev) => this.handlePagination(ev)} />
                                </div>
                            </div>
                            <div className="offset-lg-1 col-lg-4">
                                <EventCalender />
                            </div>

                        </div>

                    </div>
                </div>
            </DashboardTemplate>
        );
    }
}