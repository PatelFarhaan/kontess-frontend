
import React from 'react';
import * as session from '../../../utils/session';
import { getFetch/*, postFetch*/ } from '../../../utils/fetchRequests';
import DashboardTemplate from "../../components/dashboard-template/DashBoardTemplate";
import Card from "./Card";
import Pagination from '../../components/pagination'
import moment from "moment";
import Moment from 'react-moment';
//import { profileLogo, kontessLogo, Loading } from '../../globals/contants';
//import { confirmAlert } from 'react-confirm-alert';
//import { toast } from 'react-toastify';
//import { commonErrorMsg, noResultFoundMsg } from "../../../utils/Message";
//import { async } from 'q';
import { Urlify } from '../../globals/contants';

export default class TaskDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tracks: [],
            perPage: 10,
            userId: session.getSessionUserId(),
            dataList: [],
            curruntTrack:"",
            questions: [],
            assing_to: '',
        };
    }

    componentWillMount = async () => {
        let UserType = await session.getUserType();
        this.setState({
            UserType: UserType,
            taskId: this.props.match.params.taskId
        }, () => {
            this.getTaskDetail();
        })
    };
    /**function for get team tracks */
    getTracks = async () => {
        let self = this;
        await getFetch(`track/`).then((resp) => {
            if (resp.data) {
                self.setState({
                    tracks: resp.data
                })
                if (resp.data.length >0){
                    self.getAllTeams(0, resp.data[0].id)
                }
            }
        }).catch(err => { })
    }


    /**function for get All Teams */
    getAllTeams = async (offset = 0, search = '', sortBy = '', track = '') => {
        let self = this;
        let path_params = '&offset=' + offset
        if (track>0){
            path_params += "&track="+track
        }
        if (sortBy.length>0){
            path_params += "&sort="+sortBy
        }
        await getFetch('task/assigned-teams/?task_id=' + this.state.taskId + '&limit=' + this.state.perPage + path_params).then((responseBody) => {
            if (responseBody.status === 200) {
                self.setState({
                    curruntTrack: track,
                    dataList: responseBody.data,
                    teamsCount: responseBody.count
                })
            }
        }).catch(err => { })
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
                        submission_due_date: resp.data.submission_due_date,
                        grade_due_date: resp.data.grade_due_date,
                        questions: resp.data.questions,
                        assing_to: resp.data.assing_to
                    }, () => {
                        if (resp.data.assing_to === 'teams') {
                            self.getAllTeams();
                            self.getTracks();
                        }
                        else {
                            self.getIndividuals();
                        }
                    });
                }
            })
            .catch(err => { });
    }

    getIndividuals = async (offset = 0) => {
        let self = this;
        self.setState({
            dataList: []
        })
        await getFetch('participant_task/' + this.state.taskId + '/individual-tasks/?limit=' + this.state.perPage + '&offset=' + offset).then((responseBody) => {
            if (responseBody.status === 200) {
                self.setState({
                    dataList: responseBody.data,
                    teamsCount: responseBody.count
                })
            }
        }).catch(err => { })
    }

    getTaskStatus = (submissionDueDate, gradeDueDate) => {
        let submission_due_date = moment(submissionDueDate, 'YYYY-MM-DD hh:mm A');
        let grade_due_date = moment(gradeDueDate, 'YYYY-MM-DD hh:mm A');
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
        return <h6 className={`d-block pt-2 m-0 ${text_class}`}>{status}</h6>
    }

    onPageChangeAll = data => {
        let selected = data.selected;
        let offset = Math.ceil(selected * this.state.perPage)
        if (this.state.assing_to === 'teams') {
            this.getAllTeams(offset);
        } else {
            this.getIndividuals(offset);
        }
    }

    render() {
        const { title, /*judge,*/ description, submission_due_date, grade_due_date, questions,  assing_to, taskId } = this.state;
        return (
            <DashboardTemplate title="Task View" pageId="task" loading={this.state.loading}>
                <div>
                    <div className="all-header clear">
                        <div className="row">
                            <div className="col-lg-12 mb-4">
                                <div className="card">
                                    <div className="card-body p-3 clearfix">
                                        <div className="float-left">
                                            <h5 className="font-family-open">{title}</h5>
                                            {description ? <p
                                                dangerouslySetInnerHTML={{
                                                    __html: Urlify(description)
                                                }}></p> : ''}
                                            <a data-toggle="collapse" href="#taskDetails">View Detail</a>
                                        </div>
                                        <div className="float-right">
                                            {this.getTaskStatus(submission_due_date, grade_due_date)}
                                        </div>
                                    </div>
                                    <div id="taskDetails" className="collapse" data-parent="#accordion">
                                        <div className="card-body">
                                            <div className="grading-wrapper">
                                                <div className="clearfix mb-3">
                                                    <div className="float-left">
                                                        <p>
                                                            <strong className="text-dark">Submission due on : </strong>
                                                            <Moment format="ll">{moment(submission_due_date, 'YYYY-MM-DD hh:mm A')}</Moment> at <Moment format="hh:mm A">{moment(submission_due_date, 'YYYY-MM-DD hh:mm A')}</Moment>
                                                        </p>
                                                    </div>
                                                    <div className="float-right">
                                                        <p>
                                                            <strong className="text-dark">Grades Due On : </strong>
                                                            <Moment format="ll">{moment(grade_due_date, 'YYYY-MM-DD hh:mm A')}</Moment> at <Moment format="hh:mm A">{moment(grade_due_date, 'YYYY-MM-DD hh:mm A')}</Moment>
                                                        </p>
                                                    </div>
                                                </div>
                                                <h6>Grading questions/criteria</h6>
                                                <div className="grading-question-detail">
                                                    <table className="table table-striped">
                                                        <thead className="thead-light"><tr>
                                                            <th className="text-dark">Grading questions</th>
                                                            <th className="text-dark">Max Score</th>
                                                            <th className="text-dark">Allow feedback?</th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        {questions
                                                                ? questions.map((item, index1) => {
                                                                    if (this.state.curruntTrack === "" || this.state.curruntTrack === item.track){
                                                                        return(
                                                                            <tr key={index1}>
                                                                                <td><span>{item.question}</span></td>
                                                                                <td><span>{item.max_score}</span></td>
                                                                                <td><span className={`py-1 px-3 rounded-pill text-white ${item.feedback ? 'bg-info' : 'bg-danger'}`}>{item.feedback ? 'Allow' : 'Not Allow'}</span></td>
                                                                            </tr>
                                                                        )
                                                                    }
                                                                })
                                                                : null}
                                                        </tbody>
                                                    </table>

                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="view-result">
                        <h4 >{assing_to === 'teams' ? 'Teams assigned to you' : 'Participants list'}</h4>
                        <hr />
                        <div className="card-body padding-40">
                            <div className="tab-content">
                                <div className="row">
                                    <div className="col-md-12">
                                    {
                                            assing_to === 'teams'
                                            ?
                                            <div>
                                                <div className="ui pointing secondary menu">
                                                    <a  className={`item ${this.state.curruntTrack === '' ? 'active' : ''}`} onClick={(e) => this.getAllTeams()}>All Teams</a>
                                                    {
                                                        this.state.tracks.map((track, index) => (
                                                            <a key={index} className={`item ${this.state.curruntTrack === track.id ? 'active' : ''}`} onClick={(e) => this.getAllTeams(0, '', '', track.id)}>{track.track_name}</a>
                                                        ))
                                                    }
                                                </div>
                                                <div className="card-body padding-40">
                                                    <div className="tab-content">
                                                    <Card judging={false} teamList={this.state.dataList.teams} callBack={(e) => this.getAllTeams()} type={assing_to} judges={this.state.dataList.judges} taskId={taskId} tracks={this.state.tracks}/>
                                                        <Pagination perPage={this.state.perPage} count={this.state.teamsCount} handlePageClick={this.onPageChangeAll} />
                                                    </div>
                                                </div>
                                            </div>
                                            :
                                            <Card judging={false} individualsList={this.state.dataList.individuals} callBack={(e) => this.getAllTeams()} type={assing_to} judges={this.state.dataList.judges} taskId={taskId}  tracks={this.state.tracks}/>
                                        }
                                        <Pagination perPage={this.state.perPage} count={this.state.teamsCount} handlePageClick={this.onPageChangeAll} />
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </DashboardTemplate>
        );
    }
}
